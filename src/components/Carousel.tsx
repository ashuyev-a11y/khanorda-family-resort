"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Lightbox from "./Lightbox";

export default function Carousel({
  images,
  alt,
  title,
  aspect = "aspect-[4/3]",
}: {
  images: string[];
  alt: string;
  title?: string;
  aspect?: string;
}) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = images.length;
  if (n === 0) return null;

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div className={`relative ${aspect} overflow-hidden`}>
      <Image
        src={images[i]}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 380px"
        className="cursor-zoom-in object-cover"
        onClick={() => setOpen(true)}
      />

      {n > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Назад"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Вперёд"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, k) => (
              <span
                key={k}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: k === i ? 16 : 5,
                  background: k === i ? "#F6F2EB" : "rgba(246,242,235,.5)",
                }}
              />
            ))}
          </div>
        </>
      )}

      <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[11px] text-white backdrop-blur">
        <Expand size={11} /> {n}
      </span>

      {open && (
        <Lightbox
          images={images}
          title={title ?? alt}
          startIndex={i}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
