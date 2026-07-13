// Интерфейс репозитория бронирования + фабрика.
// Сейчас возвращает mock-хранилище (JSON-файл, локально).
// Позже добавим SupabaseStore с тем же интерфейсом — витрина/API не меняются.

import type {
  AddBlockInput,
  BlockedRange,
  Booking,
  CreateBookingInput,
  OccupiedRange,
} from "./types";
import type { UnitId } from "@config/pricing";

export interface BookingStore {
  /** Свободные дома (id) на интервал [checkin, checkout). */
  availableHousesFor(checkin: string, checkout: string): Promise<UnitId[]>;
  /** Свободен ли конкретный дом на интервал. */
  isHouseAvailable(
    houseId: UnitId,
    checkin: string,
    checkout: string
  ): Promise<boolean>;

  /** Создать бронь в статусе pending (держим слот до holdUntil). */
  createPendingBooking(input: CreateBookingInput): Promise<Booking>;
  getBooking(id: string): Promise<Booking | null>;
  /** Подтвердить оплату (админ) → confirmed. */
  confirmBooking(id: string, note?: string): Promise<Booking>;
  /** Отклонить/отменить бронь → cancelled, слот освобождается. */
  cancelBooking(id: string, note?: string): Promise<Booking>;
  /** Список броней (свежие первыми). */
  listBookings(): Promise<Booking[]>;

  /** Занятость всех домов (брони + блокировки) — для календаря. */
  occupiedRanges(): Promise<OccupiedRange[]>;

  listBlocks(): Promise<BlockedRange[]>;
  addBlock(input: AddBlockInput): Promise<BlockedRange>;
  removeBlock(id: string): Promise<void>;
}

// ---- фабрика ---------------------------------------------------------------

let store: BookingStore | null = null;

export async function getStore(): Promise<BookingStore> {
  if (store) return store;
  if (process.env.DATABASE_URL) {
    // Прод / подключённая БД (Neon Postgres)
    const { PgStore } = await import("./pgStore");
    store = new PgStore();
  } else {
    // Локальная разработка без БД — JSON-файл
    const { MockStore } = await import("./mockStore");
    store = new MockStore();
  }
  return store;
}
