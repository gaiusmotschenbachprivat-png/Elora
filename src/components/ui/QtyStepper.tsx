"use client";

import { IconMinus, IconPlus } from "./Icons";

export function QtyStepper({
  value,
  onChange,
  max,
  label = "Menge",
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div role="group" aria-label={label} className={`inline-flex items-center border border-ink/20 ${h}`}>
      <button
        type="button"
        className={`${w} flex h-full items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30`}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Menge verringern"
      >
        <IconMinus size={16} />
      </button>
      <output aria-live="polite" className="min-w-8 text-center font-mono text-[0.9rem] tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={`${w} flex h-full items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Menge erhöhen"
      >
        <IconPlus size={16} />
      </button>
    </div>
  );
}
