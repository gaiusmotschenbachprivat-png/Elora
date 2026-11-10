import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = { title: "Impressum", robots: { index: false, follow: true } };

export default function Page() {
  return <LegalPage title="Impressum" intro="Die Angaben gemäß § 5 DDG werden ergänzt, sobald das Unternehmen hinter ELORA eingetragen ist." sections={["Firmenname und Rechtsform", "Anschrift", "Vertretungsberechtigte Person(en)", "Kontakt (E-Mail, Telefon)", "Registergericht und Registernummer", "Umsatzsteuer-Identifikationsnummer", "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)", "Hinweis zur Online-Streitbeilegung / Verbraucherschlichtung"]} />;
}
