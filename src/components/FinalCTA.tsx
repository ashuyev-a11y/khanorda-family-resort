"use client";

import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";

export default function FinalCTA() {
  const { startWizard, openConcierge } = useCalculator();

  return (
    <section className="relative overflow-hidden bg-graphite py-20 text-milk sm:py-28">
      <Image
        src="/img/real-pier.webp"
        alt="Пирс Khan Orda на реке Чаган"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,20,15,.35),rgba(18,20,15,.9))]" />
      <div className="container-ko relative">
        <div className="max-w-[620px]">
          <div className="eyebrow mb-4 text-[11px] tracking-[2px] text-sand">
            Финальный шаг
          </div>
          <h2 className="font-display text-[36px] leading-tight sm:text-[56px]">
            Подобрать отдых под вашу компанию?
          </h2>
          <p className="mt-4 max-w-[34ch] text-[16px] leading-relaxed text-milk/82">
            Ответьте на 4 коротких вопроса — сайт покажет подходящий сценарий,
            даты и пример стоимости.
          </p>
          <div className="mt-7 grid gap-3 sm:max-w-[440px] sm:grid-cols-2">
            <button
              onClick={startWizard}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-copper px-5 py-4 font-bold text-milk transition hover:bg-copper-dark"
            >
              <Sparkles size={18} />
              Подобрать отдых
            </button>
            <button
              onClick={openConcierge}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-milk/35 bg-black/25 px-5 py-4 font-bold text-milk backdrop-blur transition hover:bg-white/10"
            >
              <MessageCircle size={18} />
              Консьерж
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
