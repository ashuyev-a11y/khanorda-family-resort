// Postgres (Neon) реализация BookingStore. Тот же интерфейс, что и MockStore —
// витрина/API не меняются. Активируется в getStore(), когда задан DATABASE_URL.
//
// Овербукинг предотвращается атомарно: INSERT ... SELECT WHERE NOT EXISTS
// (проверка пересечения дат внутри одного запроса).
//
// Колонки типа date приводим к тексту (::text) прямо в SQL — иначе драйвер
// вернёт JS Date и дата «поедет» из-за таймзоны. timestamptz парсим через Date.

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

import { BOOKABLE_UNITS, type UnitId } from "@config/pricing";
import { BOOKING_CONFIG } from "@config/booking";
import { calcPrice } from "@/lib/pricing";
import type { BookingStore } from "./store";
import type {
  AddBlockInput,
  BlockedRange,
  Booking,
  BookingStatus,
  CreateBookingInput,
  OccupiedRange,
} from "./types";
import { isValidDate, nightsBetween } from "./dates";

const HOUSE_IDS = BOOKABLE_UNITS.map((u) => u.id) as string[];
function isKnownHouse(id: string): id is UnitId {
  return HOUSE_IDS.includes(id);
}

function toIso(v: unknown): string {
  return v ? new Date(v as string).toISOString() : "";
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapBooking(r: any): Booking {
  // Эффективный статус: истёкший pending показываем как expired.
  let status = r.status as BookingStatus;
  if (status === "pending" && new Date(r.hold_until) <= new Date())
    status = "expired";
  return {
    id: r.id,
    houseId: r.house_id,
    checkin: r.checkin, // уже text 'YYYY-MM-DD'
    checkout: r.checkout,
    guests: Number(r.guests),
    name: r.name,
    phone: r.phone,
    total: Number(r.total),
    prepay: Number(r.prepay),
    status,
    consentOffer: Boolean(r.consent_offer),
    createdAt: toIso(r.created_at),
    holdUntil: toIso(r.hold_until),
    confirmedAt: r.confirmed_at ? toIso(r.confirmed_at) : undefined,
    note: r.note ?? undefined,
  };
}

function mapBlock(r: any): BlockedRange {
  return {
    id: r.id,
    houseId: r.house_id,
    from: r.from_date, // text
    to: r.to_date, // text
    reason: r.reason ?? undefined,
    createdAt: toIso(r.created_at),
  };
}

export class PgStore implements BookingStore {
  private sql: NeonQueryFunction<false, false>;

  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    this.sql = neon(url);
  }

  async availableHousesFor(
    checkin: string,
    checkout: string
  ): Promise<UnitId[]> {
    const rows = await this.sql`
      select distinct house_id from khanorda_bookings
        where (status = 'confirmed' or (status = 'pending' and hold_until > now()))
          and checkin < ${checkout}::date and ${checkin}::date < checkout
      union
      select distinct house_id from khanorda_blocks
        where from_date < ${checkout}::date and ${checkin}::date < to_date
    `;
    const busy = new Set(rows.map((r: any) => r.house_id));
    return BOOKABLE_UNITS.map((u) => u.id).filter((id) => !busy.has(id));
  }

  async isHouseAvailable(
    houseId: UnitId,
    checkin: string,
    checkout: string
  ): Promise<boolean> {
    const free = await this.availableHousesFor(checkin, checkout);
    return free.includes(houseId);
  }

  async createPendingBooking(input: CreateBookingInput): Promise<Booking> {
    const { houseId, checkin, checkout, guests, name, phone, consentOffer } =
      input;

    if (!isKnownHouse(houseId)) throw new Error("Неизвестный дом");
    if (!isValidDate(checkin) || !isValidDate(checkout))
      throw new Error("Некорректные даты");
    if (nightsBetween(checkin, checkout) < 1)
      throw new Error("Дата выезда должна быть позже даты заезда");
    if (!name?.trim()) throw new Error("Укажите имя");
    if (!phone?.trim()) throw new Error("Укажите телефон");
    if (!consentOffer) throw new Error("Необходимо согласие с офертой");

    const calc = calcPrice(houseId, checkin, checkout, []);
    if (!calc.valid) throw new Error(calc.error || "Ошибка расчёта");

    const holdUntil = new Date(
      Date.now() + BOOKING_CONFIG.holdMinutes * 60_000
    ).toISOString();
    const g = Math.max(1, Math.floor(guests || 1));

    // Атомарная вставка: только если даты свободны (нет пересечений).
    const rows = await this.sql`
      insert into khanorda_bookings
        (house_id, checkin, checkout, guests, name, phone, total, prepay, status, consent_offer, hold_until)
      select ${houseId}, ${checkin}::date, ${checkout}::date, ${g},
             ${name.trim()}, ${phone.trim()}, ${calc.total}, ${calc.prepay},
             'pending', true, ${holdUntil}::timestamptz
      where not exists (
        select 1 from khanorda_bookings b
        where b.house_id = ${houseId}
          and (b.status = 'confirmed' or (b.status = 'pending' and b.hold_until > now()))
          and b.checkin < ${checkout}::date and ${checkin}::date < b.checkout
      ) and not exists (
        select 1 from khanorda_blocks bl
        where bl.house_id = ${houseId}
          and bl.from_date < ${checkout}::date and ${checkin}::date < bl.to_date
      )
      returning id, house_id, checkin::text as checkin, checkout::text as checkout,
                guests, name, phone, total, prepay, status, consent_offer,
                created_at, hold_until, confirmed_at, note
    `;
    if (rows.length === 0)
      throw new Error("Эти даты уже заняты — выберите другие");
    return mapBooking(rows[0]);
  }

  async getBooking(id: string): Promise<Booking | null> {
    const rows = await this.sql`
      select id, house_id, checkin::text as checkin, checkout::text as checkout,
             guests, name, phone, total, prepay, status, consent_offer,
             created_at, hold_until, confirmed_at, note
        from khanorda_bookings where id = ${id}::uuid
    `;
    return rows.length ? mapBooking(rows[0]) : null;
  }

  async confirmBooking(id: string, note?: string): Promise<Booking> {
    const rows = await this.sql`
      update khanorda_bookings
        set status = 'confirmed', confirmed_at = now(), note = coalesce(${note ?? null}, note)
        where id = ${id}::uuid
        returning id, house_id, checkin::text as checkin, checkout::text as checkout,
                  guests, name, phone, total, prepay, status, consent_offer,
                  created_at, hold_until, confirmed_at, note
    `;
    if (rows.length === 0) throw new Error("Бронь не найдена");
    return mapBooking(rows[0]);
  }

  async cancelBooking(id: string, note?: string): Promise<Booking> {
    const rows = await this.sql`
      update khanorda_bookings
        set status = 'cancelled', note = coalesce(${note ?? null}, note)
        where id = ${id}::uuid
        returning id, house_id, checkin::text as checkin, checkout::text as checkout,
                  guests, name, phone, total, prepay, status, consent_offer,
                  created_at, hold_until, confirmed_at, note
    `;
    if (rows.length === 0) throw new Error("Бронь не найдена");
    return mapBooking(rows[0]);
  }

  async listBookings(): Promise<Booking[]> {
    const rows = await this.sql`
      select id, house_id, checkin::text as checkin, checkout::text as checkout,
             guests, name, phone, total, prepay, status, consent_offer,
             created_at, hold_until, confirmed_at, note
        from khanorda_bookings order by created_at desc
    `;
    return rows.map(mapBooking);
  }

  async occupiedRanges(): Promise<OccupiedRange[]> {
    const bookings = await this.sql`
      select house_id, checkin::text as checkin, checkout::text as checkout, status
        from khanorda_bookings
        where status = 'confirmed' or (status = 'pending' and hold_until > now())
    `;
    const blocks = await this.sql`
      select house_id, from_date::text as from_date, to_date::text as to_date
        from khanorda_blocks
    `;
    return [
      ...bookings.map((r: any) => ({
        houseId: r.house_id as UnitId,
        from: r.checkin as string,
        to: r.checkout as string,
        kind: "booking" as const,
        status: r.status as BookingStatus,
      })),
      ...blocks.map((r: any) => ({
        houseId: r.house_id as UnitId,
        from: r.from_date as string,
        to: r.to_date as string,
        kind: "block" as const,
      })),
    ];
  }

  async listBlocks(): Promise<BlockedRange[]> {
    const rows = await this.sql`
      select id, house_id, from_date::text as from_date, to_date::text as to_date,
             reason, created_at
        from khanorda_blocks order by created_at desc
    `;
    return rows.map(mapBlock);
  }

  async addBlock(input: AddBlockInput): Promise<BlockedRange> {
    if (!isKnownHouse(input.houseId)) throw new Error("Неизвестный дом");
    if (!isValidDate(input.from) || !isValidDate(input.to))
      throw new Error("Некорректные даты");
    if (nightsBetween(input.from, input.to) < 1)
      throw new Error("Дата конца должна быть позже даты начала");

    const rows = await this.sql`
      insert into khanorda_blocks (house_id, from_date, to_date, reason)
        values (${input.houseId}, ${input.from}::date, ${input.to}::date, ${input.reason?.trim() || null})
        returning id, house_id, from_date::text as from_date, to_date::text as to_date,
                  reason, created_at
    `;
    return mapBlock(rows[0]);
  }

  async removeBlock(id: string): Promise<void> {
    await this.sql`delete from khanorda_blocks where id = ${id}::uuid`;
  }
}
