"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ as FAQ_ITEMS } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import SectionHead from "./SectionHead";

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko max-w-[820px]">
        <SectionHead
          eyebrow="08 — Вопросы"
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-white"
                style={{ border: "1px solid #ece3d2" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15.5px] font-semibold text-forest">
                    {item.q}
                  </span>
                  <span
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
                    style={{ background: isOpen ? "#C67B52" : "#efe6d6", color: isOpen ? "#F6F2EB" : "#8B6849" }}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[14.5px] leading-relaxed text-[#5b5f56]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
