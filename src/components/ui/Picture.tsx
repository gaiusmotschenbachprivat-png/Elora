/* eslint-disable @next/next/no-img-element */
import { basePath } from "@/lib/services";

/** Verfügbare Breiten pro Motiv (siehe scripts/images.py). */
const WIDTHS: Record<string, number[]> = {
  hero: [800, 1280, 1920, 2400],
  still: [800, 1280, 1920, 2400],
  "pack-front": [640, 1024, 1600],
  "pack-glass": [640, 1024, 1600],
  flatlay: [640, 1024, 1600],
  glass: [640, 1024, 1600],
};

type Props = {
  name: keyof typeof WIDTHS | string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position für unterschiedliche Bildausschnitte */
  position?: string;
};

/**
 * Responsives Bild (WebP, mehrere Breiten). Bewusst ohne next/image, damit
 * der statische Export (GitHub Pages) Bildgrößen ohne Bildserver ausliefert.
 */
export function Picture({ name, alt, width, height, sizes, priority, className = "", position }: Props) {
  const widths = WIDTHS[name] ?? [1600];
  const src = (w: number) => `${basePath}/images/${name}-${w}.webp`;
  return (
    <img
      src={src(widths[widths.length - 1])}
      srcSet={widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
