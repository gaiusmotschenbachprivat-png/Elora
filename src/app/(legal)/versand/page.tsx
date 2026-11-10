import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = { title: "Versand & Zahlung", robots: { index: false, follow: true } };

export default function Page() {
  return <LegalPage title="Versand & Zahlung" intro="Versandkosten, Lieferzeiten und Zahlungsarten werden vor dem Launch festgelegt und hier veröffentlicht." sections={["Liefergebiete", "Versandkosten", "Lieferzeiten und Liefertermin bei Vorbestellungen", "Zahlungsarten (über Stripe)", "Lebensmittelkennzeichnung: Zutaten, Nährwerte, Verzehrempfehlung, Warnhinweise"]} />;
}
