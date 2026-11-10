"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { title: string; content: ReactNode; meta?: ReactNode };

export function Accordion({ items, defaultOpen = null, size = "md" }: { items: AccordionItem[]; defaultOpen?: number | null; size?: "sm" | "md" }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={item.title} className="border-b border-line">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex w-full items-center justify-between gap-6 text-left ${size === "sm" ? "py-4" : "py-6"}`}
              >
                <span className={size === "sm" ? "text-[0.95rem]" : "font-display text-[1.3rem] leading-snug sm:text-[1.5rem]"}>{item.title}</span>
                <span aria-hidden="true" className="relative h-3 w-3 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-3 bg-ink" />
                  <span className={`absolute top-0 left-1/2 h-3 w-px bg-ink transition-transform duration-500 ease-[var(--ease-soft)] ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-soft)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className={`max-w-2xl pr-8 text-ink-soft leading-relaxed ${size === "sm" ? "pb-5 text-[0.9rem]" : "pb-7"}`}>
                  {item.meta}
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
