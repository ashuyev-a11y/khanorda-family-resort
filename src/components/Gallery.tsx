"use client";

import Image from "next/image";
import { GALLERY } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import SectionHead from "./SectionHead";

export default function Gallery() {
  const { t } = useI18n();
  return (
    <section id="gallery" className="scroll-mt-20 bg-milk py-16 sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="04 — Галерея"
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <div
              key={g.src}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                loading="lazy"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 280px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
