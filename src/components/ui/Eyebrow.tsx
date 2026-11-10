import type { ReactNode } from "react";

/** Kleines Kapitel-Label in Mono, z. B. „§ 02 — Inhaltsstoffe“ */
export function Eyebrow({ children, index, tone = "dark", className = "" }: { children: ReactNode; index?: string; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`spec flex items-center gap-3 ${tone === "light" ? "text-ivory/60" : "text-ink-muted"} ${className}`}>
      {index && <span className={tone === "light" ? "text-citrus" : "text-citrus-700"}>{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
