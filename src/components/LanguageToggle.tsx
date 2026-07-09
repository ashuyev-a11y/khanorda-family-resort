"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export default function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale } = useI18n();
  const active = dark ? "#F6F2EB" : "#22352A";
  const activeBg = "#C67B52";
  const idle = dark ? "rgba(246,242,235,.6)" : "#8a8f84";

  return (
    <div
      role="group"
      aria-label="Язык / Тіл"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 3,
        borderRadius: 999,
        border: `1px solid ${dark ? "rgba(216,195,165,.4)" : "#ddd1ba"}`,
      }}
    >
      {(["ru", "kz"] as const).map((l) => {
        const on = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={on}
            style={{
              border: "none",
              cursor: "pointer",
              padding: "5px 11px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              background: on ? activeBg : "transparent",
              color: on ? "#F6F2EB" : idle,
            }}
          >
            {l === "ru" ? "RU" : "KZ"}
          </button>
        );
      })}
    </div>
  );
}
