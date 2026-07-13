"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Info, Check, Minus, Plus } from "lucide-react";
import { UNITS, ADDONS } from "@config/pricing";
import { CONTACT } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCalculator } from "@/context/CalculatorContext";
import { fmtCur, nightsWord } from "@/lib/format";
import SectionHead from "./SectionHead";

export default function Calculator() {
  const { t } = useI18n();
  const {
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
    result,
  } = useCalculator();

  const [today, setToday] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    setToday(iso);
  }, []);

  const unit = UNITS.find((u) => u.id === unitId)!;
  const maxGuests = unit.capacity;

  // keep guests within the selected unit capacity
  useEffect(() => {
    if (guests > maxGuests) setGuests(maxGuests);
  }, [maxGuests, guests, setGuests]);

  const waText = result.valid
    ? encodeURIComponent(
        `Здравствуйте! Хочу забронировать «${unit.name}» с ${checkin} по ${checkout}, ${guests} гостей. Итог по калькулятору: ${fmtCur(
          result.total
        )}.`
      )
    : "";

  return (
    <section id="calc" className="scroll-mt-20 bg-[#EFE7D7] py-16 sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="03 — Калькулятор"
          title={t.calc.title}
          subtitle={t.calc.subtitle}
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* ---------- form ---------- */}
          <div className="rounded-3xl bg-white p-5 shadow-[0_16px_44px_rgba(30,30,28,.08)] sm:p-7">
            {/* unit selector */}
            <label className="eyebrow mb-2.5 block text-[#8B6849]">
              {t.calc.unit}
            </label>
            <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {UNITS.map((u) => {
                const on = u.id === unitId;
                return (
                  <button
                    key={u.id}
                    onClick={() => setUnit(u.id)}
                    className="rounded-xl px-3 py-3 text-left transition"
                    style={{
                      background: on ? "#eef3e8" : "#faf7f0",
                      border: on ? "1px solid #a9c29a" : "1px solid #ece3d2",
                    }}
                  >
                    <div className="text-[14px] font-semibold text-forest">
                      {u.name}
                    </div>
                    <div className="text-[12px] text-[#8a8f84]">
                      до {u.capacity} · {fmtCur(u.weekdayPrice)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* dates */}
            <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {[
                { label: t.calc.checkin, value: checkin, on: setCheckin, min: today },
                {
                  label: t.calc.checkout,
                  value: checkout,
                  on: setCheckout,
                  min: checkin || today,
                },
              ].map((d) => (
                <label key={d.label} className="flex flex-col gap-1.5">
                  <span className="eyebrow text-[11px] text-[#8B6849]">
                    <CalendarDays size={12} className="mr-1 inline align-middle" />
                    {d.label}
                  </span>
                  <input
                    type="date"
                    value={d.value}
                    min={d.min || undefined}
                    onChange={(e) => d.on(e.target.value)}
                    className="rounded-xl bg-[#faf7f0] px-3.5 py-3 text-[15px] text-forest"
                    style={{ border: "1px solid #ddd1ba" }}
                  />
                </label>
              ))}
            </div>

            {/* guests */}
            <div className="mb-6 flex items-center justify-between rounded-xl bg-[#faf7f0] px-4 py-3" style={{ border: "1px solid #ece3d2" }}>
              <div>
                <div className="text-[15px] font-semibold text-forest">
                  {t.calc.guests}
                </div>
                <div className="text-[12.5px] text-[#8a8f84]">
                  {t.calc.guestsNote} · до {maxGuests}
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest"
                  style={{ border: "1px solid #ddd1ba" }}
                  aria-label="−"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-6 text-center text-[16px] font-bold">
                  {Math.min(guests, maxGuests)}
                </span>
                <button
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest"
                  style={{ border: "1px solid #ddd1ba" }}
                  aria-label="+"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* addons */}
            <label className="eyebrow mb-2.5 block text-[#8B6849]">
              {t.calc.addons}
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ADDONS.map((a) => {
                const on = addons.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className="flex items-center justify-between gap-2.5 rounded-xl px-3.5 py-3 text-left transition"
                    style={{
                      background: on ? "#eef3e8" : "#faf7f0",
                      border: on ? "1px solid #a9c29a" : "1px solid #ece3d2",
                    }}
                  >
                    <span className="flex flex-col">
                      <span className="text-[13.5px] font-semibold text-forest">
                        {a.name}
                      </span>
                      <span className="text-[11.5px] text-[#8a8f84]">{a.note}</span>
                    </span>
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="text-[13px] font-bold text-forest">
                        {fmtCur(a.price)}
                      </span>
                      <span
                        className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[7px]"
                        style={{
                          background: on ? "#22352A" : "#efe6d6",
                          color: on ? "#F6F2EB" : "#8B6849",
                        }}
                      >
                        {on ? <Check size={13} /> : <Plus size={13} />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- summary ---------- */}
          <div className="rounded-3xl bg-forest p-5 text-milk shadow-[0_16px_44px_rgba(30,30,28,.14)] sm:p-7 lg:sticky lg:top-24">
            <div className="eyebrow text-[#D8C3A5]">{t.calc.summaryTitle}</div>
            <div className="mt-1 font-display text-[24px]">{unit.name}</div>

            {!result.valid ? (
              <div
                className="mt-5 flex items-start gap-2.5 rounded-2xl p-4 text-[14px] leading-relaxed"
                style={{ background: "rgba(246,242,235,.06)", border: "1px solid rgba(216,195,165,.18)" }}
              >
                <Info size={18} className="mt-0.5 flex-none text-[#D8C3A5]" />
                <span>{result.error || t.calc.hintDates}</span>
              </div>
            ) : (
              <>
                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[14.5px]">
                  <div className="flex items-center justify-between">
                    <span className="text-milk/80">
                      {t.calc.accommodation} · {result.nights}{" "}
                      {nightsWord(result.nights)}
                    </span>
                    <span className="font-semibold">{fmtCur(result.unitTotal)}</span>
                  </div>
                  {(result.weekendNights > 0 || result.holidayNights > 0) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-milk/55">
                      {result.weekdayNights > 0 && (
                        <span>
                          {result.weekdayNights} × {t.calc.weekday}
                        </span>
                      )}
                      {result.weekendNights > 0 && (
                        <span>
                          {result.weekendNights} × {t.calc.weekend}
                        </span>
                      )}
                      {result.holidayNights > 0 && (
                        <span>
                          {result.holidayNights} × {t.calc.holiday}
                        </span>
                      )}
                    </div>
                  )}
                  {result.addonLines.map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between text-milk/75"
                    >
                      <span>
                        + {l.name}
                        {l.qty > 1 ? ` × ${l.qty}` : ""}
                      </span>
                      <span>{fmtCur(l.total)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
                  <span className="text-[15px] font-semibold">{t.calc.total}</span>
                  <span className="font-display text-[32px] text-copper">
                    {fmtCur(result.total)}
                  </span>
                </div>
                <div className="mt-1 text-[12.5px] text-milk/55">
                  {t.calc.prepay} {result.prepayPct}% — {fmtCur(result.prepay)}
                </div>

                <button
                  onClick={() => setShowSummary((v) => !v)}
                  className="mt-5 w-full rounded-xl bg-copper py-3.5 text-[15px] font-bold text-milk transition hover:bg-copper-dark"
                >
                  {t.calc.book}
                </button>

                {showSummary && (
                  <div
                    className="mt-3 rounded-2xl p-4 text-[13.5px] leading-relaxed"
                    style={{
                      background: "rgba(246,242,235,.06)",
                      border: "1px solid rgba(216,195,165,.18)",
                    }}
                  >
                    <div className="mb-2 font-semibold text-[#D8C3A5]">
                      {unit.name} · {checkin} → {checkout}
                    </div>
                    <div className="text-milk/80">
                      {result.nights} {nightsWord(result.nights)}, {guests}{" "}
                      {t.calc.guests.toLowerCase()} · {t.calc.total}:{" "}
                      <b>{fmtCur(result.total)}</b>
                    </div>
                    <a
                      href={`${CONTACT.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block rounded-xl bg-[#eef3e8] py-3 text-center text-[14px] font-semibold text-forest"
                    >
                      {t.common.whatsapp}
                    </a>
                  </div>
                )}

                <p className="mt-3 text-[12px] leading-relaxed text-milk/50">
                  {t.calc.note}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
