import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = { title: "Datenschutzerklärung", robots: { index: false, follow: true } };

export default function Page() {
  return <LegalPage title="Datenschutzerklärung" intro="Hier informieren wir künftig darüber, welche personenbezogenen Daten wir verarbeiten – beim Besuch der Website, im Kundenkonto, bei Bestellungen und bei der Launch-Registrierung." sections={["Verantwortliche Stelle", "Hosting und Server-Logfiles", "Kundenkonto und Authentifizierung (Supabase)", "Bestellabwicklung und Zahlung (Stripe)", "Launch-Registrierung und Newsletter mit Double-Opt-in (Brevo)", "Lokale Speicherung im Browser (Warenkorb, Anmeldung) – technisch notwendig", "Keine Analyse- oder Marketing-Cookies (Stand: Konzept)", "Rechtsgrundlagen und Speicherdauer", "Empfänger und Drittlandübermittlung", "Rechte der betroffenen Personen", "Widerruf von Einwilligungen"]} />;
}
