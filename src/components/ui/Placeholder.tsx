import type { ReactNode } from "react";

/**
 * Kennzeichnet vorläufige, noch nicht final bestätigte Produktangaben.
 * Alles, was in eckigen Klammern steht, ist ein Platzhalter und wird
 * vor dem Launch durch geprüfte Daten ersetzt.
 */
export function Placeholder({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <span
      title={title ?? "Vorläufiger Platzhalter – Angabe noch nicht final"}
      className="inline-flex items-baseline rounded-[4px] border border-dashed border-citrus/60 bg-citrus/[0.07] px-1.5 py-px font-medium text-citrus-700 [font-variant-numeric:tabular-nums]"
    >
      [{children}]
    </span>
  );
}

export function ConceptBadge({ children = "Konzeptinformation" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-citrus/40 bg-cream-50/70 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-citrus-700 uppercase">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-citrus" />
      {children}
    </span>
  );
}
