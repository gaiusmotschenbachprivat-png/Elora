import Link from "next/link";
import { ConceptBadge } from "@/components/ui/Placeholder";

export function LegalPlaceholder({ title, intro, sections }: { title: string; intro: string; sections: string[] }) {
  return (
    <article className="container-elora max-w-3xl pt-36 pb-24 sm:pt-44">
      <ConceptBadge>Platzhalter</ConceptBadge>
      <h1 className="mt-6 text-h2 font-light text-forest-900">{title}</h1>
      <p className="mt-5 leading-relaxed text-ink-soft">{intro}</p>
      <div className="mt-10 rounded-2xl border border-dashed border-citrus/50 bg-cream-50 p-6 sm:p-8">
        <p className="text-[0.9rem] font-medium text-ink">Vorgesehene Inhalte</p>
        <ul className="mt-4 space-y-2 text-[0.92rem] text-ink-soft">
          {sections.map((s) => (
            <li key={s} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.65rem] h-px w-3 shrink-0 bg-citrus" />
              <span>[{s}]</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.85rem] leading-relaxed text-ink-muted">
          Dieser Text wird vor Veröffentlichung der Website durch rechtlich geprüfte Inhalte ersetzt.
        </p>
      </div>
      <Link href="/" className="mt-10 inline-block text-forest underline underline-offset-4 hover:text-forest-900">
        ← Zur Startseite
      </Link>
    </article>
  );
}
