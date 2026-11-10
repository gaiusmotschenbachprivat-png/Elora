import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Anmeldung bestätigt", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Vormerkung" title={<>Danke. <em className="display-italic">Du bist dabei.</em></>} lede="Deine E-Mail-Adresse ist bestätigt. Wir melden uns, sobald es Neuigkeiten zu ELORA DAY gibt." />
      <div className="frame pb-28">
        <LinkButton href="/produkte/elora-day/" arrow>
          ELORA DAY ansehen
        </LinkButton>
      </div>
    </>
  );
}
