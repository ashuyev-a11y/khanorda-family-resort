"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Reviews() {
  const { t } = useI18n();
  return (
    <section id="reviews" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="06 — Отзывы"
          title={t.reviews.title}
          subtitle={t.reviews.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_12px_34px_rgba(30,30,28,.06)]">
                <div className="mb-3 flex gap-0.5 text-copper">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-[#3d413a]">
                  «{r.text}»
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between border-t border-[#ece3d2] pt-4">
                  <span className="font-display text-[18px] text-forest">
                    {r.name}
                  </span>
                  <span className="eyebrow text-[10px] text-[#8a8f84]">
                    {r.source}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
