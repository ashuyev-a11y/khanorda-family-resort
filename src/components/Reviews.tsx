"use client";

import { Star } from "lucide-react";
import { REVIEWS_BY_FORMAT } from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";
import Reveal from "./Reveal";

const DEFAULT_REVIEWS = [
  REVIEWS_BY_FORMAT.family,
  REVIEWS_BY_FORMAT.spa,
  REVIEWS_BY_FORMAT.birthday,
];

export default function Reviews() {
  const { personalization } = useCalculator();
  const first =
    personalization.format !== "browse"
      ? REVIEWS_BY_FORMAT[personalization.format]
      : undefined;
  const reviews =
    personalization.applied && first
      ? [first, ...DEFAULT_REVIEWS.filter((r) => r.name !== first.name)].slice(
          0,
          3
        )
      : DEFAULT_REVIEWS;

  return (
    <section id="reviews" className="scroll-mt-20 bg-[#EFE7D7] py-16 sm:py-24">
      <div className="container-ko">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex gap-0.5 text-copper">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="eyebrow text-[11px] tracking-[2px] text-wood">
              5.0 на 2GIS
            </span>
          </div>
          <h2 className="h2 text-forest">
            {personalization.applied
              ? "Отзывы похожих гостей"
              : "Отзывы гостей"}
          </h2>
        </Reveal>

        <div className="ko-snap mt-8 flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <blockquote className="flex h-full w-[86vw] max-w-[380px] flex-none flex-col rounded-3xl bg-white p-6 shadow-[0_12px_34px_rgba(30,30,28,.07)] md:w-auto md:max-w-none">
                <div className="mb-4 flex gap-0.5 text-copper">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="flex-1 font-display text-[18px] leading-relaxed text-forest">
                  «{r.text}»
                </p>
                <footer className="mt-5 flex items-center gap-3 border-t border-[#ece3d2] pt-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-white"
                    style={{ background: r.color }}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <div className="font-semibold text-forest">{r.name}</div>
                    <div className="text-[12px] text-wood">{r.source}</div>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
