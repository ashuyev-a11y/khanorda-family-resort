// Хелперы для работы с датами броней. Все даты — ISO "YYYY-MM-DD".

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDate(iso: string): boolean {
  if (!ISO_DATE.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00Z`);
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

/** Число ночей между заездом и выездом. */
export function nightsBetween(checkin: string, checkout: string): number {
  const a = new Date(`${checkin}T00:00:00Z`).getTime();
  const b = new Date(`${checkout}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}

/**
 * Пересекаются ли два интервала [aFrom, aTo) и [bFrom, bTo).
 * Границы полуоткрытые: выезд одного гостя = заезд другого НЕ конфликтует.
 */
export function rangesOverlap(
  aFrom: string,
  aTo: string,
  bFrom: string,
  bTo: string
): boolean {
  return aFrom < bTo && bFrom < aTo;
}

/** Разворачивает [from, to) в список ISO-дат занятых ночей. */
export function expandNights(from: string, to: string): string[] {
  const out: string[] = [];
  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
