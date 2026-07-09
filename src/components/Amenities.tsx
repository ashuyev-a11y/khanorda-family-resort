"use client";

import {
  Flame,
  Snowflake,
  Waves,
  Beef,
  Utensils,
  Tent,
  Anchor,
  Umbrella,
  Baby,
  Mic,
  BedDouble,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { AMENITIES } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const ICONS: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  Waves,
  Beef,
  Utensils,
  Tent,
  Anchor,
  Umbrella,
  Baby,
  Mic,
  BedDouble,
  Coffee,
};

export default function Amenities() {
  const { t } = useI18n();
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
            return (
              <Reveal key={a.label} delay={i * 40}>
                <div
                  className="flex h-full items-center gap-3 rounded-2xl p-4"
                  style={{
                    background: "rgba(246,242,235,.05)",
                    border: "1px solid rgba(216,195,165,.16)",
                  }}
                >
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                    style={{ background: "rgba(198,123,82,.18)", color: "#C67B52" }}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="text-[14.5px] font-medium">{a.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
