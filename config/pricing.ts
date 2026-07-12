// ============================================================================
//  KHAN ORDA — ЕДИНЫЙ КОНФИГ ЦЕН
//  Меняйте цены и услуги ТОЛЬКО здесь — вся витрина и калькулятор берут данные
//  отсюда. Ничего не нужно править в компонентах.
//
//  ⚠️  Цифры ниже — ПЛЕЙСХОЛДЕРЫ. Замените на реальные цены Khan Orda.
// ============================================================================

export const CURRENCY = "₸";

/**
 * Дни недели, которые считаются «выходными» (ночь дороже).
 * 0 = воскресенье, 1 = понедельник … 5 = пятница, 6 = суббота.
 * По умолчанию дороже ночи с пятницы на субботу и с субботы на воскресенье.
 */
export const WEEKEND_NIGHTS = [5, 6];

/**
 * Праздничные даты (ISO, «YYYY-MM-DD») — ночь по этой дате считается по
 * праздничной цене домика (holidayPrice), либо по выходной, если она не задана.
 * Добавляйте сюда даты праздников/высокого сезона.
 */
export const HOLIDAYS: string[] = [
  "2026-01-01",
  "2026-01-02",
  "2026-03-21", // Наурыз
  "2026-03-22",
  "2026-12-31",
];

// ----------------------------------------------------------------------------
//  ДОМИКИ (юниты). weekdayPrice — будни, weekendPrice — выходные, holidayPrice —
//  праздники (необязательно; если не задано, берётся weekendPrice).
// ----------------------------------------------------------------------------
export type UnitId = "aframe" | "family" | "riverside";

export interface Unit {
  id: UnitId;
  name: string;
  tagline: string;
  capacity: number; // максимум гостей с ночёвкой
  weekdayPrice: number;
  weekendPrice: number;
  holidayPrice?: number;
  image: string; // путь в /public/img
  features: string[];
}

export const UNITS: Unit[] = [
  {
    id: "aframe",
    name: "A-Frame Chalet",
    tagline: "Уютный домик у воды для пары",
    capacity: 2,
    weekdayPrice: 90000,
    weekendPrice: 120000,
    holidayPrice: 140000,
    image: "/img/real-exterior.webp",
    features: ["Панорамное остекление", "Джакузи на террасе", "Камин", "Пирс"],
  },
  {
    id: "family",
    name: "Family Lodge",
    tagline: "Просторный дом для всей семьи",
    capacity: 8,
    weekdayPrice: 130000,
    weekendPrice: 170000,
    holidayPrice: 200000,
    image: "/img/real-living-wide.webp",
    features: ["2 спальни", "Кухня-гостиная", "Барбекю-зона", "Детская площадка"],
  },
  {
    id: "riverside",
    name: "Riverside House",
    tagline: "Вся приватная территория на берегу Чагана",
    capacity: 16,
    weekdayPrice: 180000,
    weekendPrice: 230000,
    holidayPrice: 270000,
    image: "/img/real-pier.webp",
    features: ["До 16 гостей днём", "Сауна и купель", "Костровая зона", "Пляж и волейбол"],
  },
];

// ----------------------------------------------------------------------------
//  ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
//  mode: "once"      — фиксированная цена за всё бронирование
//        "per_night" — цена умножается на число ночей
// ----------------------------------------------------------------------------
export type AddonId = "banya" | "chan" | "breakfast" | "transfer" | "bbq";

export interface Addon {
  id: AddonId;
  name: string;
  note: string;
  price: number;
  mode: "once" | "per_night";
}

export const ADDONS: Addon[] = [
  { id: "banya", name: "Баня", note: "русская баня на дровах", price: 25000, mode: "once" },
  { id: "chan", name: "Чан на дровах", note: "купель под открытым небом", price: 20000, mode: "once" },
  { id: "breakfast", name: "Завтрак", note: "за каждую ночь, на компанию", price: 8000, mode: "per_night" },
  { id: "transfer", name: "Трансфер", note: "из Уральска и обратно", price: 12000, mode: "once" },
  { id: "bbq", name: "Барбекю-сет", note: "мангал, дрова, посуда", price: 15000, mode: "once" },
];

// ----------------------------------------------------------------------------
//  ОБЩИЕ НАСТРОЙКИ КАЛЬКУЛЯТОРА
// ----------------------------------------------------------------------------
export const BOOKING = {
  prepaymentPct: 30, // предоплата, %
  defaultUnitId: "family" as UnitId,
  minNights: 1,
};
