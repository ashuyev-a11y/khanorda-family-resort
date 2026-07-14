"use client";

import { Camera, Home, MessageCircle, Sparkles, Umbrella, Wallet } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";

export default function MobileBar() {
  const { openConcierge } = useCalculator();
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-forest/70";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e3d8c3] bg-milk/94 px-2 pb-[calc(7px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_24px_rgba(30,30,28,.1)] backdrop-blur-xl max-[860px]:flex hidden">
      <a href="#top" className={item}>
        <Home size={18} />
        Главная
      </a>
      <a href="#gallery" className={item}>
        <Camera size={18} />
        Галерея
      </a>
      <button
        onClick={openConcierge}
        className="-mt-8 flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-bold text-forest"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-copper text-milk shadow-[0_12px_30px_rgba(198,123,82,.45)]">
          <MessageCircle size={24} />
        </span>
        Консьерж
      </button>
      <a href="#amenities" className={item}>
        <Umbrella size={18} />
        Удобства
      </a>
      <a href="#calc" className={item}>
        <Wallet size={18} />
        Цены
      </a>
      <span className="sr-only">
        <Sparkles />
      </span>
    </nav>
  );
}
