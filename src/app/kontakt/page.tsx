import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Tbd } from "@/components/ui/Notice";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with ELORA." };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Write <br />to us.</>} lede="We are happy to answer questions about ELORA DAY, the launch or collaborations." />
      <section className="frame pb-28">
        <dl className="border-t border-forest/50 lg:ml-[33.333%]">
          {[
            ["Email", <Tbd key="m">contact address to follow</Tbd>],
            ["Press", <Tbd key="p">press contact to follow</Tbd>],
            ["Address", <Tbd key="a">see Impressum – to follow</Tbd>],
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
