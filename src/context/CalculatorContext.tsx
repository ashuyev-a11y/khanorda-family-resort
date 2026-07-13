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
  const el = document.getElementById("calc");
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
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
    const el = document.getElementById("calc");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const result = useMemo(
    () => calcPrice(unitId, checkin, checkout, addons),
    [unitId, checkin, checkout, addons]
  );

  // Любая кнопка «Забронировать» (шапка/hero/мобайл/калькулятор) ведёт сюда:
  // если даты выбраны — открываем модалку, иначе прокручиваем к калькулятору.
  const openBooking = useCallback(() => {
    if (result.valid) setBookingOpen(true);
    else scrollToCalc();
  }, [result.valid]);
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
