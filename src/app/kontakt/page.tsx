import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Tbd } from "@/components/ui/Notice";

export const metadata: Metadata = { title: "Kontakt" };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Kontakt" title={<>Schreib <em className="display-italic">uns.</em></>} lede="Fragen zu ELORA DAY, zum Launch oder zu Kooperationen beantworten wir gerne." />
      <section className="frame pb-28">
        <dl className="border-t border-ink/80 lg:ml-[33.333%]">
          {[
            ["E-Mail", <Tbd key="m">Kontaktadresse folgt</Tbd>],
            ["Presse", <Tbd key="p">Pressekontakt folgt</Tbd>],
            ["Anschrift", <Tbd key="a">siehe Impressum – folgt</Tbd>],
          ].map(([k, v]) => (
            <div key={String(k)} className="grid grid-cols-[8rem_1fr] gap-6 border-b border-line py-6">
              <dt className="spec pt-1 text-ink-muted">{k}</dt>
              <dd className="text-[1.05rem]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
