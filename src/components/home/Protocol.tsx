import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StatusTag } from "@/components/ui/Notice";
import { protocol, protocolStatus } from "@/lib/content";

export function Protocol({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="protocol-title" className="py-24 lg:py-36">
      <div className="frame">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Quality &amp; transparency</Eyebrow>
            <H id="protocol-title" className="caps mt-10 font-display text-title text-forest">
              What is confirmed.
              <br />
              <span className="display-italic text-ink">And what is not – yet.</span>
            </H>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-16" delay={100}>
            <p className="leading-relaxed text-ink-soft">
              Our transparency record shows the current state of development. We will only mention certificates, laboratory results or seals once they actually exist.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-forest/50" role="table" aria-label="Transparency record">
          <div role="row" className="hidden grid-cols-12 gap-8 border-b border-line py-3 lg:grid">
            <span role="columnheader" className="spec col-span-3 text-ink-muted">
              Area
            </span>
            <span role="columnheader" className="spec col-span-6 text-ink-muted">
              Our commitment
            </span>
            <span role="columnheader" className="spec col-span-3 text-right text-ink-muted">
              Status
            </span>
          </div>
          {protocol.map((row, i) => (
            <Reveal key={row.area} delay={i * 50} role="row" className="grid gap-3 border-b border-line py-7 lg:grid-cols-12 lg:gap-8 lg:py-9">
              <p role="cell" className="font-display text-[1.6rem] leading-tight lg:col-span-3">
                {row.area}
              </p>
              <p role="cell" className="leading-relaxed text-ink-soft lg:col-span-6">
                {row.commitment}
              </p>
              <p role="cell" className="lg:col-span-3 lg:text-right">
                <StatusTag tone={row.status === "fixed" ? "live" : "pending"}>{protocolStatus[row.status]}</StatusTag>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
