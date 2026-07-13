"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BOOKING, type AddonId, type UnitId } from "@config/pricing";
import { calcPrice, type CalcResult } from "@/lib/pricing";

type CalculatorContextValue = {
  unitId: UnitId;
  checkin: string;
  checkout: string;
  guests: number;
  addons: AddonId[];
  setUnit: (id: UnitId) => void;
  setCheckin: (v: string) => void;
  setCheckout: (v: string) => void;
  setGuests: (n: number) => void;
  toggleAddon: (id: AddonId) => void;
  selectUnitAndScroll: (id: UnitId) => void;
  result: CalcResult;
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

function scrollToCalc() {
  // scrollIntoView, НЕ window.scrollTo — на этой странице window.scrollTo не
  // срабатывает (scroll-behavior:smooth на html). Отступ под шапку даёт
  // класс scroll-mt-20 на секции #calc.
  document
    .getElementById("calc")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [unitId, setUnitId] = useState<UnitId>(BOOKING.defaultUnitId);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);

  const toggleAddon = useCallback((id: AddonId) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const setUnit = useCallback((id: UnitId) => setUnitId(id), []);

  const selectUnitAndScroll = useCallback((id: UnitId) => {
    setUnitId(id);
    scrollToCalc();
  }, []);

  const result = useMemo(
    () => calcPrice(unitId, checkin, checkout, addons),
    [unitId, checkin, checkout, addons]
  );

  // Любая кнопка «Забронировать» (шапка/hero/мобайл/калькулятор) всегда
  // открывает модалку — гарантированная обратная связь. Если даты не выбраны,
  // модалка показывает подсказку выбрать даты (+ кнопку перейти к калькулятору).
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value: CalculatorContextValue = {
    unitId,
    checkin,
    checkout,
    guests,
    addons,
    setUnit,
    setCheckin,
    setCheckout,
    setGuests,
    toggleAddon,
    selectUnitAndScroll,
    result,
    bookingOpen,
    openBooking,
    closeBooking,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx)
    throw new Error("useCalculator must be used within CalculatorProvider");
  return ctx;
}
