import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen", robots: { index: false, follow: true } };

export default function Page() {
  return <LegalPage title="Allgemeine Geschäftsbedingungen" intro="Die AGB werden vor Aktivierung von Vorbestellung oder Verkauf veröffentlicht." sections={["Geltungsbereich und Vertragspartner", "Vertragsschluss (inkl. Vorbestellung)", "Preise und Versandkosten", "Lieferung und Liefertermine bei Vorbestellungen", "Zahlung", "Eigentumsvorbehalt", "Gewährleistung", "Gutscheine"]} />;
}
