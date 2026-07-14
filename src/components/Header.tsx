"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";

export default function Header() {
  const { openConcierge } = useCalculator();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(246,242,235,.96)" : "transparent",
        boxShadow: solid ? "0 2px 18px rgba(30,30,28,.1)" : "none",
        backdropFilter: solid ? "blur(10px)" : "none",
        WebkitBackdropFilter: solid ? "blur(10px)" : "none",
      }}
    >
      <div className="container-ko flex items-center justify-between py-3.5">
        <a href="#top" className="flex flex-col gap-0.5">
          <span
            className="font-display text-[20px] leading-none transition-colors"
            style={{ color: solid ? "#22352A" : "#F6F2EB" }}
          >
            Khan Orda
          </span>
          <span
            className="eyebrow text-[8px] tracking-[3px] transition-colors"
            style={{ color: solid ? "#8B6849" : "#D8C3A5" }}
          >
            Family Resort
          </span>
        </a>

        <button
          onClick={openConcierge}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition"
          style={{
            color: solid ? "#22352A" : "#F6F2EB",
            border: solid
              ? "1px solid rgba(139,104,73,.35)"
              : "1px solid rgba(246,242,235,.42)",
            background: solid ? "rgba(139,104,73,.08)" : "rgba(30,30,28,.28)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <Sparkles size={15} className="text-copper" />
          Консьерж
        </button>
      </div>
    </header>
  );
}
