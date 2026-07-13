"use client";

import { Users, ArrowRight } from "lucide-react";
import { UNITS } from "@config/pricing";
import { HOUSE_PHOTOS } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCalculator } from "@/context/CalculatorContext";
import { fmt } from "@/lib/format";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Carousel from "./Carousel";

export default function Units() {
  const { t } = useI18n();
  const { selectUnitAndScroll } = useCalculator();

  return (
    <section id="units" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="01 — Khan Orda"
          title={t.units.title}
          subtitle={t.units.subtitle}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {UNITS.map((u, i) => (
            <Reveal key={u.id} delay={i * 80}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_rgba(30,30,28,.08)]">
                <div className="relative">
                  <Carousel images={HOUSE_PHOTOS} alt={u.name} title={u.name} />
                  <span
                    className="eyebrow pointer-events-none absolute left-3 top-3 z-10 rounded-full px-3 py-1.5 text-[10px]"
                    style={{ background: "rgba(30,30,28,.55)", color: "#F6F2EB", letterSpacing: 1.5 }}
                  >
                    <Users size={11} className="mr-1 inline align-middle" />
                    {t.units.capacity}: {u.capacity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[26px] text-forest">{u.name}</h3>
                  <p className="mt-1 text-sm text-[#6b6f66]">{u.tagline}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {u.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full bg-[#faf7f0] px-3 py-1.5 text-[12.5px] text-[#3d413a]"
                        style={{ border: "1px solid #ece3d2" }}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between border-t border-[#ece3d2] pt-4">
                    <div>
                      <div className="text-[12px] text-[#8a8f84]">{t.units.from}</div>
                      <div className="font-display text-[24px] text-forest">
                        {fmt(u.weekdayPrice)} ₸
                        <span className="ml-1 text-[13px] font-sans text-[#8a8f84]">
                          / {t.units.perNight}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => selectUnitAndScroll(u.id)}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-semibold text-milk transition hover:bg-pine"
                  >
                    {t.units.select}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
