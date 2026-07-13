"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCalculator } from "@/context/CalculatorContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useI18n();
  const { openBooking } = useCalculator();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#units", label: t.nav.units },
    { href: "#amenities", label: t.nav.amenities },
    { href: "#calc", label: t.nav.calc },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#location", label: t.nav.location },
    { href: "#faq", label: t.nav.faq },
  ];

  const linkColor = solid ? "#22352A" : "#F6F2EB";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(246,242,235,.95)" : "transparent",
        boxShadow: solid ? "0 2px 20px rgba(30,30,28,.08)" : "none",
        backdropFilter: solid ? "blur(10px)" : "none",
        WebkitBackdropFilter: solid ? "blur(10px)" : "none",
      }}
    >
      <div className="container-ko flex items-center justify-between gap-4 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="font-display text-[20px] transition-colors"
            style={{ color: linkColor }}
          >
            Khan Orda
          </span>
          <span
            className="eyebrow text-[8px] rounded px-1.5 py-1 transition-colors"
            style={{
              color: solid ? "#8B6849" : "#D8C3A5",
              border: `1px solid ${solid ? "rgba(139,104,73,.4)" : "rgba(216,195,165,.5)"}`,
            }}
          >
            Family Resort
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {links.slice(0, 6).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: linkColor }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle dark={!solid} />
          <button
            onClick={openBooking}
            className="hidden sm:inline-flex rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-milk transition-colors hover:bg-copper-dark"
          >
            {t.nav.book}
          </button>
          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            style={{
              border: `1px solid ${solid ? "#ddd1ba" : "rgba(216,195,165,.4)"}`,
              color: linkColor,
              background: solid ? "transparent" : "rgba(30,30,28,.25)",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="lg:hidden"
          style={{
            background: "#22352A",
            borderTop: "1px solid rgba(216,195,165,.14)",
          }}
        >
          <div className="container-ko flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3.5 text-[16px] font-medium text-milk last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
