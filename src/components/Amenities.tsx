"use client";

import { useState } from "react";
import {
  Home,
  Flame,
  Snowflake,
  Waves,
  Beef,
  Utensils,
  Baby,
  Anchor,
  Trees,
  Car,
  Images,
  type LucideIcon,
} from "lucide-react";
import { AMENITIES } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Lightbox from "./Lightbox";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Flame,
  Snowflake,
  Waves,
  Beef,
  Utensils,
  Baby,
  Anchor,
  Trees,
  Car,
};

export default function Amenities() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="amenities" className="scroll-mt-20 bg-forest py-16 text-milk sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="02 — Что входит"
          title={t.amenities.title}
          subtitle={t.amenities.subtitle}
          dark
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Flame;
            const hasPhotos = a.photos.length > 0;
            const inner = (
              <>
                <span
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                  style={{ background: "rgba(198,123,82,.18)", color: "#C67B52" }}
                >
                  <Icon size={20} />
                </span>
                <span className="flex-1 text-left text-[14.5px] font-medium">
                  {a.label}
                </span>
                {hasPhotos && (
                  <span className="flex items-center gap-1 text-[11px] text-milk/55">
                    <Images size={13} />
                    {a.photos.length}
                  </span>
                )}
              </>
            );
            const cls =
              "flex h-full w-full items-center gap-3 rounded-2xl p-4 text-left transition";
            const style = {
              background: "rgba(246,242,235,.05)",
              border: "1px solid rgba(216,195,165,.16)",
            };
            return (
              <Reveal key={a.label} delay={i * 40}>
                {hasPhotos ? (
                  <button
                    onClick={() => setActive(i)}
                    className={`${cls} hover:-translate-y-0.5 hover:bg-white/10`}
                    style={style}
                  >
                    {inner}
                  </button>
                ) : (
                  <div className={cls} style={style}>
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {active !== null && (
        <Lightbox
          images={AMENITIES[active].photos}
          title={AMENITIES[active].label}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
