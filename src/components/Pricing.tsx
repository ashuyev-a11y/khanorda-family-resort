"use client";

import { UNITS, ADDONS } from "@config/pricing";
import { useI18n } from "@/i18n/LanguageProvider";
import { fmtCur } from "@/lib/format";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Pricing() {
  const { t } = useI18n();
  return (
    <section id="pricing" className="scroll-mt-20 bg-forest py-16 text-milk sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="05 — Цены"
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
          dark
        />

        <Reveal>
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "rgba(246,242,235,.05)", border: "1px solid rgba(216,195,165,.18)" }}
          >
            <div className="flex flex-col gap-6">
              <div className="eyebrow text-[#D8C3A5]">Всё включено · одинаково для всех домов A-Frame</div>
              <div className="flex flex-wrap gap-x-12 gap-y-5">
                <div>
                  <div className="text-[12px] uppercase tracking-wide text-milk/55">
                    {t.pricing.weekday}
                  </div>
                  <div className="mt-1 font-display text-[40px] leading-none text-milk sm:text-[48px]">
                    {fmtCur(UNITS[0].weekdayPrice)}
                    <span className="ml-2 font-sans text-[14px] text-milk/55">/ сутки</span>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-wide text-milk/55">
                    {t.pricing.weekend}
                  </div>
                  <div className="mt-1 font-display text-[40px] leading-none text-copper sm:text-[48px]">
                    {fmtCur(UNITS[0].weekendPrice)}
                    <span className="ml-2 font-sans text-[14px] text-milk/55">/ сутки</span>
                  </div>
                </div>
              </div>
              <div className="text-[13.5px] text-milk/60">
                Выходные — ночи с пятницы на субботу и с субботы на воскресенье. Баня,
                купель с ледяной водой, джакузи, беседка с мангалом, детская площадка и
                пирс — уже в цене.
              </div>
              <ul className="flex flex-wrap gap-2">
                {UNITS.map((u) => (
                  <li
                    key={u.id}
                    className="rounded-full px-4 py-2 text-[13px] text-milk/85"
                    style={{ border: "1px solid rgba(216,195,165,.28)" }}
                  >
                    {u.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="eyebrow mb-3 text-[#D8C3A5]">{t.pricing.services}</div>
          <div className="flex flex-wrap gap-2.5">
            {ADDONS.map((a) => (
              <span
                key={a.id}
                className="rounded-full px-4 py-2 text-[13px]"
                style={{ border: "1px solid rgba(216,195,165,.28)" }}
              >
                {a.name} — <b className="text-[#D8C3A5]">{fmtCur(a.price)}</b>
                {a.mode === "per_night" ? " / ночь" : ""}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
