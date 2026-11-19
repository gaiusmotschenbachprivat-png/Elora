import { PageIntro } from "@/components/ui/PageIntro";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: string[] }) {
  return (
    <>
      <PageIntro eyebrow="Legal · placeholder" title={title} lede={intro} />
      <section className="frame pb-28">
        <div className="border-t border-forest/50 lg:ml-[33.333%]">
          <p className="spec border-b border-line py-4 text-gold-700">Planned contents – to be completed and legally reviewed before any sale</p>
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
