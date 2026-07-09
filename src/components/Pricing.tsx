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

        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="text-[12px] uppercase tracking-wide text-milk/55">
                <th className="pb-4 pr-4 font-medium">{t.pricing.unit}</th>
                <th className="pb-4 px-4 font-medium">{t.pricing.weekday}</th>
                <th className="pb-4 px-4 font-medium">{t.pricing.weekend}</th>
                <th className="pb-4 pl-4 font-medium">{t.pricing.holiday}</th>
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u) => (
                <tr key={u.id} className="border-t border-white/10">
                  <td className="py-4 pr-4">
                    <div className="font-display text-[19px]">{u.name}</div>
                    <div className="text-[12.5px] text-milk/55">
                      до {u.capacity} гостей
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-[14px] text-milk/85">
                    {fmtCur(u.weekdayPrice)}
                  </td>
                  <td className="px-4 py-4 font-mono text-[14px] text-[#D8C3A5]">
                    {fmtCur(u.weekendPrice)}
                  </td>
                  <td className="py-4 pl-4 font-mono text-[14px] text-copper">
                    {fmtCur(u.holidayPrice ?? u.weekendPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
