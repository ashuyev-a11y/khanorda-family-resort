"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCalculator } from "@/context/CalculatorContext";

/** Fixed bottom action bar on phones (≤860px, hidden above via CSS). */
export default function MobileBar() {
  const { t } = useI18n();
  const { openBooking } = useCalculator();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 hidden max-[860px]:flex"
      style={{
        gap: 10,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
        background: "rgba(246,242,235,.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid #e3d8c3",
        boxShadow: "0 -6px 24px rgba(30,30,28,.1)",
      }}
    >
      <button
        onClick={openBooking}
        className="flex-1 rounded-xl bg-copper py-3.5 text-center text-[16px] font-bold text-milk"
      >
        {t.hero.cta}
      </button>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex w-[52px] flex-none items-center justify-center rounded-xl text-forest"
        style={{ background: "#eef3e8", border: "1px solid #ccd6c2" }}
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
}
