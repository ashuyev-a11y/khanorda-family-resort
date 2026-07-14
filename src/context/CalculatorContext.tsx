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
import type { ImportantKey, RestFormat } from "@/data/personalization";

type PersonalizationState = {
  hero: "intro" | "wizard" | "result";
  step: 1 | 2 | 3 | 4;
  format: RestFormat;
  when: string;
  kids: boolean | null;
  important: Record<ImportantKey, boolean>;
  applied: boolean;
  conciergeOpen: boolean;
};

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
  personalization: PersonalizationState;
  startWizard: () => void;
  cancelWizard: () => void;
  resetWizard: () => void;
  pickFormat: (format: RestFormat) => void;
  pickWhen: (key: string) => void;
  setKids: (value: boolean) => void;
  toggleImportant: (key: ImportantKey) => void;
  finishWizard: () => void;
  openConcierge: () => void;
  closeConcierge: () => void;
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
  const [personalization, setPersonalization] = useState<PersonalizationState>({
    hero: "intro",
    step: 1,
    format: "family",
    when: "",
    kids: null,
    important: {
      banya: false,
      jacuzzi: false,
      fishing: false,
      bbq: false,
      play: false,
    },
    applied: false,
    conciergeOpen: false,
  });

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

  const startWizard = useCallback(() => {
    setPersonalization((s) => ({ ...s, hero: "wizard", step: 1 }));
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const cancelWizard = useCallback(() => {
    setPersonalization((s) => ({ ...s, hero: s.applied ? "result" : "intro" }));
  }, []);

  const resetWizard = useCallback(() => {
    setPersonalization((s) => ({
      ...s,
      hero: "wizard",
      step: 1,
      applied: false,
      important: {
        banya: false,
        jacuzzi: false,
        fishing: false,
        bbq: false,
        play: false,
      },
    }));
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const pickFormat = useCallback((format: RestFormat) => {
    setPersonalization((s) => ({ ...s, format, step: 2 }));
  }, []);

  const pickWhen = useCallback(
    (key: string) => {
      const d = new Date();
      if (key === "tomorrow") d.setDate(d.getDate() + 1);
      if (key === "weekend") {
        const offset = (5 - d.getDay() + 7) % 7 || 7;
        d.setDate(d.getDate() + offset);
      }
      if (key === "date") d.setDate(d.getDate() + 7);

      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
      const out = new Date(`${iso}T00:00:00`);
      out.setDate(out.getDate() + 1);
      const checkoutIso = `${out.getFullYear()}-${String(
        out.getMonth() + 1
      ).padStart(2, "0")}-${String(out.getDate()).padStart(2, "0")}`;

      setCheckin(iso);
      setCheckout(checkoutIso);
      setPersonalization((s) => ({ ...s, when: key, step: 3 }));
    },
    [setCheckin, setCheckout]
  );

  const setKids = useCallback((value: boolean) => {
    setPersonalization((s) => ({ ...s, kids: value, step: 4 }));
  }, []);

  const toggleImportant = useCallback((key: ImportantKey) => {
    setPersonalization((s) => ({
      ...s,
      important: { ...s.important, [key]: !s.important[key] },
    }));
  }, []);

  const finishWizard = useCallback(() => {
    setPersonalization((s) => ({ ...s, hero: "result", applied: true }));
  }, []);

  const openConcierge = useCallback(
    () => setPersonalization((s) => ({ ...s, conciergeOpen: true })),
    []
  );

  const closeConcierge = useCallback(
    () => setPersonalization((s) => ({ ...s, conciergeOpen: false })),
    []
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
    bookingOpen,
    openBooking,
    closeBooking,
    personalization,
    startWizard,
    cancelWizard,
    resetWizard,
    pickFormat,
    pickWhen,
    setKids,
    toggleImportant,
    finishWizard,
    openConcierge,
    closeConcierge,
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
