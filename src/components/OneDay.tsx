"use client";

import Image from "next/image";
import { DAY_CARDS, formatLabel } from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";
import Reveal from "./Reveal";

export default function OneDay() {
  const { personalization } = useCalculator();
  const lead = personalization.applied
    ? `Ваш ${formatLabel(personalization.format)} может выглядеть так`
    : "Ваш день может выглядеть так";

  return (
    <section className="bg-[#EFE7D7] py-16 sm:py-24">
      <div className="container-ko">
        <Reveal>
          <h2 className="h2 text-forest">Один день в Khan Orda</h2>
          <p className="mt-2 text-[15px] text-[#6b6f66]">{lead}</p>
        </Reveal>
      </div>
      <div className="ko-snap mt-8 flex gap-4 overflow-x-auto px-5 sm:px-[calc((100vw-1180px)/2+20px)]">
        {DAY_CARDS.map((card) => (
          <figure
            key={card.title}
            className="relative h-[320px] w-[78vw] max-w-[360px] flex-none overflow-hidden rounded-3xl shadow-[0_16px_44px_rgba(30,30,28,.14)]"
          >
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes="360px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(18,20,15,.9))]" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-milk">
              <div className="eyebrow mb-2 text-[10px] tracking-[2px] text-sand">
                {card.time}
              </div>
              <div className="font-display text-[23px]">{card.title}</div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-milk/82">
                {card.text}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
