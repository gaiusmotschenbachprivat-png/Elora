"use client";

import { useId, useState } from "react";
import { faqStatusLabel, type FaqItem } from "@/lib/content";
import { IconPlus } from "./Icons";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span className="font-display text-[1.15rem] font-normal text-forest-900 transition-colors group-hover:text-forest sm:text-[1.3rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-soft)] ${
                    isOpen
                      ? "rotate-45 border-forest bg-forest text-cream-50"
                      : "border-line text-forest group-hover:border-forest"
                  }`}
                >
                  <IconPlus size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-soft)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl pr-12 pb-7">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase ${
                      item.status === "fixed"
                        ? "bg-forest text-cream-50"
                        : "border border-dashed border-citrus/60 text-citrus-700"
                    }`}
                  >
                    {faqStatusLabel[item.status]}
                  </span>
                  {item.a.map((para) => (
                    <p key={para} className="mt-3 leading-relaxed text-ink-soft">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
