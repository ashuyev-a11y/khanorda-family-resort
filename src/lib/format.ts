const nf = new Intl.NumberFormat("ru-RU");

export function fmt(n: number): string {
  return nf.format(Math.round(n));
}

export function fmtCur(n: number, currency = "₸"): string {
  return `${nf.format(Math.round(n))} ${currency}`;
}

/** Correct Russian plural: 1 ночь / 2 ночи / 5 ночей. */
export function nightsWord(k: number): string {
  const m = k % 10;
  const h = k % 100;
  if (m === 1 && h !== 11) return "ночь";
  if (m >= 2 && m <= 4 && (h < 10 || h >= 20)) return "ночи";
  return "ночей";
}
