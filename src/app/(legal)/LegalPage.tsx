import { PageIntro } from "@/components/ui/PageIntro";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: string[] }) {
  return (
    <>
      <PageIntro eyebrow="Rechtliches · Platzhalter" title={title} lede={intro} />
      <section className="frame pb-28">
        <div className="border-t border-ink/80 lg:ml-[33.333%]">
          <p className="spec border-b border-line py-4 text-citrus-700">Vorgesehene Inhalte – vor Verkaufsstart fachlich zu prüfen</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s} className="grid grid-cols-[3rem_1fr] border-b border-line py-5">
                <span className="spec pt-1 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink-soft">[{s}]</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
