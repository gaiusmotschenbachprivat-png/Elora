import type { Metadata } from "next";
import { LegalPlaceholder } from "../LegalPlaceholder";

export const metadata: Metadata = { title: "Impressum", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <LegalPlaceholder
      title="Impressum"
      intro="Die Angaben gemäß § 5 DDG werden ergänzt, sobald das Unternehmen hinter ELORA final eingetragen ist."
      sections={["Firmenname und Rechtsform", "Anschrift", "Vertretungsberechtigte Person(en)", "Kontakt (E-Mail, Telefon)", "Registereintrag und Registernummer", "Umsatzsteuer-ID", "Verantwortlich für den Inhalt"]}
    />
  );
}
