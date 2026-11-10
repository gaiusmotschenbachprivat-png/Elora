import type { Metadata } from "next";
import { LegalPlaceholder } from "../LegalPlaceholder";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <LegalPlaceholder
      title="Allgemeine Geschäftsbedingungen"
      intro="ELORA DAY ist noch nicht erhältlich. Allgemeine Geschäftsbedingungen werden mit dem Start des Verkaufs veröffentlicht."
      sections={["Geltungsbereich", "Vertragsschluss", "Preise und Versandkosten", "Lieferung", "Zahlung", "Gewährleistung"]}
    />
  );
}
