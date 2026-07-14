"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, RotateCcw, Sparkles, X } from "lucide-react";
import { CONTACT } from "@/data/content";
import {
  FORMAT_OPTIONS,
  IMPORTANT_OPTIONS,
  formatLabel,
} from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";
import { fmtCur, nightsWord } from "@/lib/format";

function longDate(iso: string): string {
  if (!iso) return "выбранная дата";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(new Date(`${iso}T00:00:00`));
}

export default function Hero() {
  const {
    checkin,
    checkout,
    guests,
    result,
    setGuests,
    openBooking,
    personalization,
    startWizard,
    cancelWizard,
    resetWizard,
    pickFormat,
    pickWhen,
    setKids,
    toggleImportant,
    finishWizard,
  } = useCalculator();
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!personalization.applied && personalization.hero === "intro") {
        setShowNudge(true);
      }
    }, 2200);
    return () => window.clearTimeout(t);
  }, [personalization.applied, personalization.hero]);

  const selected = FORMAT_OPTIONS.find(
    (f) => f.key === personalization.format
  );
  const price = result.valid ? fmtCur(result.total) : "100 000 ₸";
  const nights = result.valid
    ? `${result.nights} ${nightsWord(result.nights)}`
    : "1 ночь";
  const waText = encodeURIComponent(
    `Здравствуйте! Хочу забронировать ${selected?.houseName ?? "дом"} в Khan Orda.\n` +
      `Формат: ${formatLabel(personalization.format)}\n` +
      `Даты: ${checkin || "уточнить"} → ${checkout || "уточнить"}\n` +
      `Гостей: ${guests}\n` +
      `Стоимость на сайте: ${price}`
  );

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-graphite"
    >
      <Image
        src="/img/real-exterior.webp"
        alt="Khan Orda — дом A-Frame у реки"
        fill
        priority
        sizes="100vw"
        className="object-cover motion-safe:animate-[heroDrift_18s_ease-in-out_infinite]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,20,15,.52)_0%,rgba(18,20,15,.14)_34%,rgba(18,20,15,.68)_64%,rgba(18,20,15,.96)_100%)]" />

      <div className="container-ko relative w-full pb-8 pt-28 sm:pb-16">
        {personalization.hero === "intro" && (
          <div className="max-w-[620px] animate-[koRise_.55s_ease_forwards]">
            <div className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-milk/30 px-3.5 py-2 text-[10px] tracking-[2px] text-milk backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_10px_#C67B52]" />
              Halal Friendly
            </div>
            <h1 className="max-w-[12ch] font-display text-[clamp(38px,10vw,78px)] leading-[1.02] text-milk">
              Здесь отдыхает только ваша семья
            </h1>
            <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-milk/90 sm:text-[19px]">
              Закрытая территория, баня, джакузи, пирс и тишина в 20 минутах
              от Уральска.
            </p>
            <div className="mt-7 grid gap-3 sm:max-w-[440px]">
              <a
                href="#calc"
                className="rounded-2xl border border-milk/40 bg-black/25 px-5 py-4 text-center font-semibold text-milk backdrop-blur transition hover:bg-white/10"
              >
                Проверить даты
              </a>
              <button
                onClick={() => {
                  setShowNudge(false);
                  startWizard();
                }}
                className="rounded-2xl bg-copper px-5 py-4 text-center text-[16px] font-bold text-milk shadow-[0_16px_40px_rgba(198,123,82,.48)] transition hover:bg-copper-dark motion-safe:animate-[koGlow_2.6s_infinite]"
              >
                ✨ Подобрать отдых за 30 секунд
              </button>
            </div>
          </div>
        )}

        {personalization.hero === "wizard" && (
          <div className="max-w-[520px] rounded-[22px] border border-milk/20 bg-[#12140f]/60 p-5 text-milk shadow-2xl backdrop-blur-xl animate-[koPop_.35s_ease_forwards]">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow text-[11px] tracking-[2px] text-sand">
                Шаг {personalization.step} / 4
              </span>
              <button
                onClick={cancelWizard}
                className="rounded-full p-2 text-milk/60 transition hover:bg-white/10 hover:text-milk"
                aria-label="Закрыть подбор"
              >
                <X size={17} />
              </button>
            </div>

            {personalization.step === 1 && (
              <>
                <div className="font-display text-[24px]">
                  С кем планируете отдых?
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {FORMAT_OPTIONS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => pickFormat(f.key)}
                      className="flex items-center gap-2 rounded-2xl border border-milk/20 bg-milk/10 px-3 py-3.5 text-left text-[14px] font-semibold transition hover:border-copper hover:bg-copper/20"
                    >
                      <span className="text-[18px]">{f.emoji}</span>
                      {f.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {personalization.step === 2 && (
              <>
                <div className="font-display text-[24px]">
                  Когда хотите приехать?
                </div>
                <div className="mt-4 grid gap-2.5">
                  {[
                    ["today", "Сегодня", "если дом свободен"],
                    ["tomorrow", "Завтра", "быстрый заезд"],
                    ["weekend", "Эти выходные", "пятница или суббота"],
                    ["date", "📅 Выбрать дату", "поставим дату через неделю"],
                  ].map(([key, label, hint]) => (
                    <button
                      key={key}
                      onClick={() => pickWhen(key)}
                      className="flex items-center justify-between rounded-2xl border border-milk/20 bg-milk/10 px-4 py-3.5 text-left font-semibold transition hover:border-copper hover:bg-copper/20"
                    >
                      <span>{label}</span>
                      <span className="text-[12px] font-medium text-milk/60">
                        {hint}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {personalization.step === 3 && (
              <>
                <div className="font-display text-[24px]">Сколько гостей?</div>
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-milk/20 bg-milk/10 px-4 py-4">
                  <span className="font-semibold">Гостей</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-9 w-9 rounded-xl border border-milk/25 text-[20px]"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-[20px] font-bold">
                      {guests}
                    </span>
                    <button
                      onClick={() => setGuests(Math.min(16, guests + 1))}
                      className="h-9 w-9 rounded-xl border border-milk/25 text-[20px]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-[14px] text-milk/80">
                  Едете с детьми?
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {[true, false].map((value) => (
                    <button
                      key={String(value)}
                      onClick={() => setKids(value)}
                      className="rounded-2xl border border-milk/25 px-4 py-3 font-semibold transition hover:border-copper hover:bg-copper/20"
                    >
                      {value ? "Да" : "Нет"}
                    </button>
                  ))}
                </div>
              </>
            )}

            {personalization.step === 4 && (
              <>
                <div className="font-display text-[24px]">
                  Что для вас важно?
                </div>
                <div className="mt-3 divide-y divide-milk/10">
                  {IMPORTANT_OPTIONS.map((i) => {
                    const on = personalization.important[i.key];
                    return (
                      <button
                        key={i.key}
                        onClick={() => toggleImportant(i.key)}
                        className="flex w-full items-center gap-3 py-3 text-left"
                      >
                        <span className="w-6 text-center">{i.emoji}</span>
                        <span className="flex-1 font-semibold">{i.label}</span>
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                            on
                              ? "bg-copper text-milk"
                              : "border border-milk/35 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={finishWizard}
                  className="mt-4 w-full rounded-2xl bg-copper px-5 py-4 font-bold text-milk transition hover:bg-copper-dark"
                >
                  Подобрать вариант ✨
                </button>
              </>
            )}

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-milk/15">
              <div
                className="h-full rounded-full bg-copper transition-all"
                style={{ width: `${(personalization.step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {personalization.hero === "result" && (
          <div className="max-w-[560px] animate-[koPop_.4s_ease_forwards] text-milk">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-copper px-4 py-2 text-[12px] font-bold">
              <Sparkles size={14} /> Подобрали для вас
            </div>
            <h1 className="font-display text-[34px] leading-tight sm:text-[48px]">
              Мы нашли отдых для {formatLabel(personalization.format)}
            </h1>
            <p className="mt-2 text-milk/80">
              Свободные даты проверяются при бронировании · всё включено
            </p>

            <div className="mt-5 rounded-[22px] border border-milk/20 bg-[#12140f]/55 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-[24px]">
                    {selected?.houseName ?? "A-Frame №1"}
                  </div>
                  <div className="mt-1 text-[13px] text-sand">
                    {longDate(checkin)} · {nights}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[28px] text-copper">
                    {price}
                  </div>
                  <div className="text-[12px] text-milk/60">
                    {guests} гостей
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-2.5">
                <button
                  onClick={openBooking}
                  className="rounded-2xl bg-copper px-5 py-4 font-bold text-milk transition hover:bg-copper-dark"
                >
                  Забронировать
                </button>
                <a
                  href={`${CONTACT.whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-milk/35 px-4 py-4 font-semibold"
                >
                  WA
                </a>
              </div>
            </div>

            <button
              onClick={resetWizard}
              className="mt-4 inline-flex items-center gap-2 text-[14px] text-milk/75 hover:text-milk"
            >
              <RotateCcw size={15} /> Подобрать заново
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-milk/70 sm:justify-start">
              Листайте — сайт подобран под вас <ArrowDown size={15} />
            </div>
          </div>
        )}
      </div>

      {showNudge && (
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[440px] animate-[koSheet_.35s_ease_forwards] px-4 pb-4 max-[860px]:bottom-[74px]">
          <div className="rounded-[22px] border border-[#ece3d2] bg-milk p-4 shadow-[0_16px_44px_rgba(30,30,28,.2)]">
            <div className="font-semibold text-forest">
              Добро пожаловать 👋
            </div>
            <div className="mt-1 text-[14px] text-[#6b6f66]">
              Подберём отдых за 30 секунд?
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <button
                onClick={() => {
                  setShowNudge(false);
                  startWizard();
                }}
                className="rounded-xl bg-copper px-4 py-3 font-bold text-milk"
              >
                Да
              </button>
              <button
                onClick={() => setShowNudge(false)}
                className="rounded-xl bg-[#efe6d6] px-4 py-3 font-semibold text-forest"
              >
                Позже
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
