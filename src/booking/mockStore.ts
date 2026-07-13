// Локальное хранилище брони на JSON-файле (.data/booking.json).
// ⚠️ Только для разработки/демо: на serverless (Vercel) файловая запись НЕ
// персистится между запросами. В проде этот класс заменит SupabaseStore.

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { BOOKABLE_UNITS, type UnitId } from "@config/pricing";
import { BOOKING_CONFIG } from "@config/booking";
import { calcPrice } from "@/lib/pricing";
import type { BookingStore } from "./store";
import type {
  AddBlockInput,
  BlockedRange,
  Booking,
  CreateBookingInput,
  OccupiedRange,
} from "./types";
import { isValidDate, nightsBetween, rangesOverlap } from "./dates";

interface DbShape {
  bookings: Booking[];
  blocks: BlockedRange[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "booking.json");

const HOUSE_IDS = BOOKABLE_UNITS.map((u) => u.id);

function isKnownHouse(id: string): id is UnitId {
  return (HOUSE_IDS as string[]).includes(id);
}

export class MockStore implements BookingStore {
  private async read(): Promise<DbShape> {
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      const db = JSON.parse(raw) as DbShape;
      db.bookings ??= [];
      db.blocks ??= [];
      return this.expirePending(db);
    } catch {
      return { bookings: [], blocks: [] };
    }
  }

  private async write(db: DbShape): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
  }

  /** Помечаем pending с истёкшим холдом как expired (слот освобождается). */
  private expirePending(db: DbShape): DbShape {
    const now = new Date().toISOString();
    for (const b of db.bookings) {
      if (b.status === "pending" && b.holdUntil < now) b.status = "expired";
    }
    return db;
  }

  /** Активная бронь блокирует слот: confirmed или ещё живой pending. */
  private isBlocking(b: Booking): boolean {
    return b.status === "confirmed" || b.status === "pending";
  }

  private houseBusy(
    db: DbShape,
    houseId: UnitId,
    checkin: string,
    checkout: string
  ): boolean {
    const bookingHit = db.bookings.some(
      (b) =>
        b.houseId === houseId &&
        this.isBlocking(b) &&
        rangesOverlap(b.checkin, b.checkout, checkin, checkout)
    );
    if (bookingHit) return true;
    return db.blocks.some(
      (bl) =>
        bl.houseId === houseId &&
        rangesOverlap(bl.from, bl.to, checkin, checkout)
    );
  }

  async availableHousesFor(
    checkin: string,
    checkout: string
  ): Promise<UnitId[]> {
    const db = await this.read();
    return BOOKABLE_UNITS.map((u) => u.id).filter(
      (id) => !this.houseBusy(db, id, checkin, checkout)
    );
  }

  async isHouseAvailable(
    houseId: UnitId,
    checkin: string,
    checkout: string
  ): Promise<boolean> {
    const db = await this.read();
    return !this.houseBusy(db, houseId, checkin, checkout);
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

    // Цену считаем на сервере — не доверяем клиенту.
    const calc = calcPrice(houseId, checkin, checkout, []);
    if (!calc.valid) throw new Error(calc.error || "Ошибка расчёта");

    const db = await this.read();
    if (this.houseBusy(db, houseId, checkin, checkout))
      throw new Error("Эти даты уже заняты — выберите другие");

    const now = new Date();
    const holdUntil = new Date(
      now.getTime() + BOOKING_CONFIG.holdMinutes * 60_000
    );

    const booking: Booking = {
      id: randomUUID(),
      houseId,
      checkin,
      checkout,
      guests: Math.max(1, Math.floor(guests || 1)),
      name: name.trim(),
      phone: phone.trim(),
      total: calc.total,
      prepay: calc.prepay, // 100% = total
      status: "pending",
      consentOffer: true,
      createdAt: now.toISOString(),
      holdUntil: holdUntil.toISOString(),
    };

    db.bookings.push(booking);
    await this.write(db);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | null> {
    const db = await this.read();
    return db.bookings.find((b) => b.id === id) ?? null;
  }

  async confirmBooking(id: string, note?: string): Promise<Booking> {
    const db = await this.read();
    const b = db.bookings.find((x) => x.id === id);
    if (!b) throw new Error("Бронь не найдена");
    // Повторно проверяем, что слот всё ещё свободен (кроме самой брони).
    const conflict = db.bookings.some(
      (o) =>
        o.id !== b.id &&
        o.houseId === b.houseId &&
        this.isBlocking(o) &&
        rangesOverlap(o.checkin, o.checkout, b.checkin, b.checkout)
    );
    if (conflict) throw new Error("Конфликт: даты уже заняты другой бронью");
    b.status = "confirmed";
    b.confirmedAt = new Date().toISOString();
    if (note) b.note = note;
    await this.write(db);
    return b;
  }

  async cancelBooking(id: string, note?: string): Promise<Booking> {
    const db = await this.read();
    const b = db.bookings.find((x) => x.id === id);
    if (!b) throw new Error("Бронь не найдена");
    b.status = "cancelled";
    if (note) b.note = note;
    await this.write(db);
    return b;
  }

  async listBookings(): Promise<Booking[]> {
    const db = await this.read();
    return [...db.bookings].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  }

  async occupiedRanges(): Promise<OccupiedRange[]> {
    const db = await this.read();
    const fromBookings: OccupiedRange[] = db.bookings
      .filter((b) => this.isBlocking(b))
      .map((b) => ({
        houseId: b.houseId,
        from: b.checkin,
        to: b.checkout,
        kind: "booking" as const,
        status: b.status,
      }));
    const fromBlocks: OccupiedRange[] = db.blocks.map((bl) => ({
      houseId: bl.houseId,
      from: bl.from,
      to: bl.to,
      kind: "block" as const,
    }));
    return [...fromBookings, ...fromBlocks];
  }

  async listBlocks(): Promise<BlockedRange[]> {
    const db = await this.read();
    return db.blocks;
  }

  async addBlock(input: AddBlockInput): Promise<BlockedRange> {
    if (!isKnownHouse(input.houseId)) throw new Error("Неизвестный дом");
    if (!isValidDate(input.from) || !isValidDate(input.to))
      throw new Error("Некорректные даты");
    if (nightsBetween(input.from, input.to) < 1)
      throw new Error("Дата конца должна быть позже даты начала");

    const db = await this.read();
    const block: BlockedRange = {
      id: randomUUID(),
      houseId: input.houseId,
      from: input.from,
      to: input.to,
      reason: input.reason?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    db.blocks.push(block);
    await this.write(db);
    return block;
  }

  async removeBlock(id: string): Promise<void> {
    const db = await this.read();
    db.blocks = db.blocks.filter((b) => b.id !== id);
    await this.write(db);
  }
}
