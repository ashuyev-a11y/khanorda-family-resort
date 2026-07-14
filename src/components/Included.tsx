"use client";

import { INCLUDED_BY_FORMAT } from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";
import Reveal from "./Reveal";

export default function Included() {
  const { personalization } = useCalculator();
  const content =
    personalization.applied
      ? INCLUDED_BY_FORMAT[personalization.format]
      : INCLUDED_BY_FORMAT.default;

  return (
    <section id="amenities" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko">
        <Reveal>
          {personalization.applied && (
            <div className="mb-3 inline-flex rounded-full bg-[#f2ebdd] px-3 py-1.5 text-[11px] font-bold tracking-[.5px] text-wood">
              ✦ ПОДОБРАНО ДЛЯ ВАС
            </div>
          )}
          <h2 className="h2 max-w-[680px] text-forest">{content.title}</h2>
          <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-[#6b6f66] sm:text-[17px]">
            {content.subtitle}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {content.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <article className="flex h-full flex-col gap-3 rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(30,30,28,.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2ebdd] text-[20px] text-wood">
                  {item.icon}
                </span>
                <h3 className="text-[15px] font-bold leading-tight text-forest sm:text-[17px]">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#7d817a]">
                  {item.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
