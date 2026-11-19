import type { ReactNode } from "react";

/** Kleines Label mit großzügiger Laufweite, optional mit Index (01, 02 …). */
export function Eyebrow({ children, index, tone = "dark", className = "" }: { children: ReactNode; index?: string; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`spec flex items-center gap-4 ${tone === "light" ? "text-ivory/75" : "text-ink-muted"} ${className}`}>
      {index && <span className={tone === "light" ? "text-gold" : "text-gold-700"}>{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}
