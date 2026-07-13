// Доменная модель бронирования. Не зависит от конкретного хранилища —
// mock-стор (локально) и Supabase (позже) реализуют один интерфейс.

import type { UnitId } from "@config/pricing";

export type BookingStatus =
  | "pending" // создана, ждём оплату (держим слот до holdUntil)
  | "confirmed" // оплата подтверждена админом, дата закрыта
  | "cancelled" // отменена/отклонена
  | "expired"; // истёк холд без оплаты

export interface Booking {
  id: string;
  houseId: UnitId;
  checkin: string; // ISO date YYYY-MM-DD (день заезда)
  checkout: string; // ISO date YYYY-MM-DD (день выезда, не включается)
  guests: number;
  name: string;
  phone: string;
  total: number; // итоговая стоимость проживания, ₸
  prepay: number; // сумма к оплате (100% = total), ₸
  status: BookingStatus;
  consentOffer: boolean; // акцепт публичной оферты
  createdAt: string; // ISO datetime
  holdUntil: string; // ISO datetime — до какого момента держим слот
  confirmedAt?: string; // ISO datetime подтверждения оплаты
  note?: string; // заметка админа
}

/** Ручная блокировка дат (офлайн-бронь, обслуживание) — заводит админ. */
export interface BlockedRange {
  id: string;
  houseId: UnitId;
  from: string; // ISO date (включительно)
  to: string; // ISO date (не включается, как checkout)
  reason?: string;
  createdAt: string;
}

/** Диапазон занятости для календаря на витрине/в админке. */
export interface OccupiedRange {
  houseId: UnitId;
  from: string; // ISO date
  to: string; // ISO date (не включается)
  kind: "booking" | "block";
  status?: BookingStatus;
}

export interface CreateBookingInput {
  houseId: UnitId;
  checkin: string;
  checkout: string;
  guests: number;
  name: string;
  phone: string;
  consentOffer: boolean;
}

export interface AddBlockInput {
  houseId: UnitId;
  from: string;
  to: string;
  reason?: string;
}
