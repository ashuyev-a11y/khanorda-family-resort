"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  PERSONAL_GALLERY,
  galleryCategories,
} from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery() {
  const { personalization } = useCalculator();
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => {
    const cats = galleryCategories(personalization.format);
    if (!personalization.applied || !cats) return PERSONAL_GALLERY.slice(0, 8);
    return PERSONAL_GALLERY.filter((g) => g.cats.some((c) => cats.includes(c)));
  }, [personalization.applied, personalization.format]);
  const srcs = shown.map((g) => g.src);

  return (
    <section id="gallery" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko">
        <Reveal>
          {personalization.applied && (
            <div className="mb-3 inline-flex rounded-full bg-[#f2ebdd] px-3 py-1.5 text-[11px] font-bold tracking-[.5px] text-wood">
              ✦ ГАЛЕРЕЯ ДЛЯ ВАС
            </div>
          )}
          <h2 className="h2 text-forest">
            {personalization.applied ? "Как здесь именно для вас" : "Галерея"}
          </h2>
          <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-[#6b6f66]">
            Реальные фото дома, SPA-зоны, пирса, BBQ и территории Khan Orda.
          </p>
        </Reveal>
      </div>

      <div className="ko-snap mt-8 flex gap-4 overflow-x-auto px-5 sm:px-[calc((100vw-1180px)/2+20px)]">
        {shown.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setOpen(i)}
            className="relative h-[280px] w-[74vw] max-w-[340px] flex-none overflow-hidden rounded-3xl text-left shadow-[0_14px_34px_rgba(30,30,28,.12)]"
          >
            <Image
              src={g.src}
              alt={g.cap}
              fill
              loading="lazy"
              sizes="340px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(18,20,15,.82))] p-4 pt-16 text-[15px] font-bold text-milk">
              {g.cap}
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={srcs}
          title="Галерея Khan Orda"
          startIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
