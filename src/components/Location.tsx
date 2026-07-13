"use client";

import { MapPin, Route, Phone, MessageCircle } from "lucide-react";
import { CONTACT, MAP } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Location() {
  const { t } = useI18n();
  return (
    <section id="location" className="scroll-mt-20 bg-water py-16 text-milk sm:py-24">
      <div className="container-ko">
        <SectionHead
          eyebrow="07 — Локация"
          title={t.location.title}
          subtitle={t.location.subtitle}
          dark
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="flex flex-col gap-4">
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(246,242,235,.06)", border: "1px solid rgba(216,195,165,.18)" }}
            >
              <div className="mb-1 flex items-center gap-2 text-[#D8C3A5]">
                <MapPin size={18} />
                <span className="eyebrow text-[11px]">{t.location.addressLabel}</span>
              </div>
              <div className="text-[15.5px]">{t.location.address}</div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(246,242,235,.06)", border: "1px solid rgba(216,195,165,.18)" }}
            >
              <div className="mb-1 flex items-center gap-2 text-[#D8C3A5]">
                <Route size={18} />
                <span className="eyebrow text-[11px]">{t.location.routeLabel}</span>
              </div>
              <div className="text-[15px] text-milk/85">{t.location.route}</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl bg-milk/10 px-4 py-3 text-[14px] font-semibold"
                style={{ border: "1px solid rgba(246,242,235,.3)" }}
              >
                <Phone size={16} /> {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-copper px-4 py-3 text-[14px] font-semibold text-milk"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal
            className="relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(216,195,165,.2)" }}
          >
            <iframe
              src={MAP.embedSrc}
              title={t.location.title}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full min-h-[300px] w-full flex-1 border-0"
            />
            <div className="flex items-center gap-2 bg-graphite/80 px-4 py-2.5 text-[12.5px] text-milk/80">
              <MapPin size={14} className="flex-none text-copper" />
              {MAP.caption}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
