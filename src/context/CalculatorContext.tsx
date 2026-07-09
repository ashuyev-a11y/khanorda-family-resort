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
};

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [unitId, setUnitId] = useState<UnitId>(BOOKING.defaultUnitId);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [addons, setAddons] = useState<AddonId[]>([]);

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
