"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCalculator } from "@/context/CalculatorContext";

export default function Hero() {
  const { t } = useI18n();
  const { openBooking } = useCalculator();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <Image
        src="/img/real-exterior.webp"
        alt="Домик Khan Orda с чаном под открытым небом"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(30,30,28,.45) 0%,rgba(30,30,28,.05) 32%,rgba(34,53,42,.35) 60%,rgba(30,30,28,.9) 100%)",
        }}
      />
      <div className="container-ko relative w-full pb-16 pt-28 sm:pb-24">
        <div
          className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2"
          style={{
            color: "#F6F2EB",
            border: "1px solid rgba(246,242,235,.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            fontSize: 10.5,
            letterSpacing: 2,
          }}
        >
          <span
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: "#C67B52", boxShadow: "0 0 10px #C67B52" }}
          />
          {t.hero.eyebrow}
        </div>

        <h1
          className="font-display text-milk"
          style={{
            fontWeight: 400,
            fontSize: "clamp(38px,8vw,80px)",
            lineHeight: 1.02,
            letterSpacing: "-.01em",
            maxWidth: "16ch",
            textWrap: "balance",
            margin: "0 0 20px",
          }}
        >
          {t.hero.title}
        </h1>

        <p
          className="text-milk/90"
          style={{
            fontSize: "clamp(16px,2vw,20px)",
            lineHeight: 1.55,
            maxWidth: 560,
            marginBottom: 30,
          }}
        >
          {t.hero.subtitle}
        </p>

        <div className="mb-9 flex flex-wrap gap-3">
          <button
            onClick={openBooking}
            className="rounded-xl bg-copper px-7 py-4 text-base font-semibold text-milk transition hover:bg-copper-dark"
            style={{ boxShadow: "0 14px 34px rgba(198,123,82,.45)" }}
          >
            {t.hero.cta}
          </button>
          <a
            href="#units"
            className="rounded-xl px-7 py-4 text-base font-semibold text-milk transition hover:bg-white/10"
            style={{
              border: "1px solid rgba(246,242,235,.5)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {t.hero.badges.map((b) => (
            <span
              key={b}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-milk"
              style={{
                border: "1px solid rgba(246,242,235,.26)",
                background: "rgba(30,30,28,.22)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
