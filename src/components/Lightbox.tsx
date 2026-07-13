"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  images,
  title,
  startIndex = 0,
  onClose,
}: {
  images: string[];
  title?: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(startIndex);
  const n = images.length;

  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // простой свайп
  const [x0, setX0] = useState<number | null>(null);

  if (n === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-black/92"
      onClick={onClose}
      onTouchStart={(e) => setX0(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (dx > 50) prev();
        else if (dx < -50) next();
        setX0(null);
      }}
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 text-milk"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[14px] font-medium">
          {title ? `${title} · ` : ""}
          {i + 1} / {n}
        </span>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* image */}
      <div
        className="flex flex-1 items-center justify-center overflow-hidden px-2 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[i]}
          alt={title ?? "Фото Khan Orda"}
          className="max-h-full max-w-full rounded-xl object-contain"
        />
      </div>

      {/* arrows */}
      {n > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Назад"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-milk hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Вперёд"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-milk hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* dots */}
      {n > 1 && n <= 12 && (
        <div
          className="flex justify-center gap-1.5 pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Фото ${k + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: k === i ? 20 : 6,
                background: k === i ? "#C67B52" : "rgba(246,242,235,.4)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
