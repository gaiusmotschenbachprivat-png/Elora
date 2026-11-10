"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ProductImage } from "@/lib/catalog";
import { Picture } from "@/components/ui/Picture";

export function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Mobil: aktiven Index aus der Scrollposition ableiten */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setIndex((prev) => (prev === i ? prev : i));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const next = (i + images.length) % images.length;
    setIndex(next);
    const track = trackRef.current;
    if (track && getComputedStyle(track).display !== "none") {
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div role="region" aria-roledescription="Bildergalerie" aria-label={`Bilder von ${name}`} onKeyDown={onKey}>
      {/* Mobil: wischbare Bildleiste */}
      <div className="relative lg:hidden">
        <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" tabIndex={0} aria-label="Bilder – zum Wechseln wischen">
          {images.map((img, i) => (
            <div key={img.src} className="aspect-[4/5] w-full shrink-0 snap-center bg-sand" aria-hidden={i !== index}>
              <Picture name={img.src} alt={img.alt} width={img.width} height={img.height} sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="frame absolute inset-x-0 bottom-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Bild ${i + 1} von ${images.length}`}
                aria-current={i === index}
                className="flex h-8 items-center"
              >
                <span className={`block h-px transition-all duration-500 ${i === index ? "w-8 bg-ink" : "w-4 bg-ink/35"}`} />
              </button>
            ))}
          </div>
          <span className="spec text-ink-soft tabular-nums" aria-live="polite">
            {index + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Desktop: Thumbnails + Hauptbild */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-[5.5rem_1fr]">
        <ul className="flex flex-col gap-3" aria-label="Bildauswahl">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} anzeigen`}
                aria-current={i === index}
                className={`block aspect-[4/5] w-full overflow-hidden bg-sand transition-opacity duration-300 ${i === index ? "opacity-100 outline outline-1 outline-offset-2 outline-ink" : "opacity-55 hover:opacity-100"}`}
              >
                <Picture name={img.src} alt="" width={img.width} height={img.height} sizes="90px" />
              </button>
            </li>
          ))}
        </ul>
        <div className="relative aspect-[4/5] overflow-hidden bg-sand" tabIndex={0} aria-label="Hauptbild – Pfeiltasten wechseln das Bild">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-soft)] ${i === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0"}`}
              aria-hidden={i !== index}
            >
              <Picture name={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 52vw, 100vw" priority={i === 0} />
            </div>
          ))}
          <div className="absolute right-4 bottom-4 flex gap-2">
            <button type="button" onClick={() => go(index - 1)} aria-label="Vorheriges Bild" className="flex h-11 w-11 items-center justify-center bg-ivory-50/85 backdrop-blur transition-colors hover:bg-ivory-50">
              <svg aria-hidden="true" viewBox="0 0 24 12" className="h-3 w-6 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 6h22M17 1l5 5-5 5" />
              </svg>
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Nächstes Bild" className="flex h-11 w-11 items-center justify-center bg-ivory-50/85 backdrop-blur transition-colors hover:bg-ivory-50">
              <svg aria-hidden="true" viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 6h22M17 1l5 5-5 5" />
              </svg>
            </button>
          </div>
          <p className="spec absolute top-4 left-4 bg-ivory-50/80 px-2 py-1 text-ink-soft backdrop-blur">Konzeptvisualisierung</p>
        </div>
      </div>
    </div>
  );
}
