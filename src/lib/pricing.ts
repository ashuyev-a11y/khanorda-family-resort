import {
  UNITS,
  ADDONS,
  WEEKEND_NIGHTS,
  HOLIDAYS,
  BOOKING,
  type Unit,
  type UnitId,
  type AddonId,
} from "@config/pricing";

export type NightKind = "weekday" | "weekend" | "holiday";

export interface NightBreak {
  date: string; // ISO
  kind: NightKind;
  price: number;
}

export interface AddonLine {
  id: AddonId;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface CalcResult {
  valid: boolean;
  error?: string;
  unit?: Unit;
  nights: number;
  perNight: NightBreak[];
  weekdayNights: number;
  weekendNights: number;
  holidayNights: number;
  unitTotal: number;
  addonLines: AddonLine[];
  addonsTotal: number;
  total: number;
  prepay: number;
  prepayPct: number;
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nightKind(d: Date, iso: string): NightKind {
  if (HOLIDAYS.includes(iso)) return "holiday";
  if (WEEKEND_NIGHTS.includes(d.getDay())) return "weekend";
  return "weekday";
}

function priceFor(unit: Unit, kind: NightKind): number {
  if (kind === "holiday") return unit.holidayPrice ?? unit.weekendPrice;
  if (kind === "weekend") return unit.weekendPrice;
  return unit.weekdayPrice;
}

const empty = (unit?: Unit, error?: string): CalcResult => ({
  valid: false,
  error,
  unit,
  nights: 0,
  perNight: [],
  weekdayNights: 0,
  weekendNights: 0,
  holidayNights: 0,
  unitTotal: 0,
  addonLines: [],
  addonsTotal: 0,
  total: 0,
  prepay: 0,
  prepayPct: BOOKING.prepaymentPct,
});

/**
 * Pure front-end price calculation. Nothing is sent anywhere.
 * total = Σ(price per night, by weekday/weekend/holiday) + Σ(selected add-ons).
 */
export function calcPrice(
  unitId: UnitId,
  checkin: string,
  checkout: string,
  addonIds: AddonId[]
): CalcResult {
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit) return empty(undefined, "Выберите домик");
  if (!checkin || !checkout)
    return empty(unit, "Выберите даты заезда и выезда");

  const start = new Date(`${checkin}T00:00:00`);
  const end = new Date(`${checkout}T00:00:00`);
  if (isNaN(start.getTime()) || isNaN(end.getTime()))
    return empty(unit, "Некорректные даты");
  if (end <= start)
    return empty(unit, "Дата выезда должна быть позже даты заезда");

  const nights = Math.round(
    (end.getTime() - start.getTime()) / 86_400_000
  );

  const perNight: NightBreak[] = [];
  for (let i = 0; i < nights; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = toISO(d);
    const kind = nightKind(d, iso);
    perNight.push({ date: iso, kind, price: priceFor(unit, kind) });
  }

  const unitTotal = perNight.reduce((a, n) => a + n.price, 0);
  const weekdayNights = perNight.filter((n) => n.kind === "weekday").length;
  const weekendNights = perNight.filter((n) => n.kind === "weekend").length;
  const holidayNights = perNight.filter((n) => n.kind === "holiday").length;

  const addonLines: AddonLine[] = ADDONS.filter((a) =>
    addonIds.includes(a.id)
  ).map((a) => {
    const qty = a.mode === "per_night" ? nights : 1;
    return {
      id: a.id,
      name: a.name,
      qty,
      unitPrice: a.price,
      total: a.price * qty,
    };
  });

  const addonsTotal = addonLines.reduce((a, l) => a + l.total, 0);
  const total = unitTotal + addonsTotal;
  const prepay = (total * BOOKING.prepaymentPct) / 100;

  return {
    valid: true,
    unit,
    nights,
    perNight,
    weekdayNights,
    weekendNights,
    holidayNights,
    unitTotal,
    addonLines,
    addonsTotal,
    total,
    prepay,
    prepayPct: BOOKING.prepaymentPct,
  };
}
