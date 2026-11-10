import type { Metadata } from "next";
import { LegalPlaceholder } from "../LegalPlaceholder";

export const metadata: Metadata = { title: "Datenschutzerklärung", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <LegalPlaceholder
      title="Datenschutzerklärung"
      intro="Hier informieren wir künftig ausführlich darüber, welche personenbezogenen Daten wir verarbeiten – insbesondere bei der Anmeldung zur Vormerkliste."
      sections={["Verantwortliche Stelle", "Hosting und Server-Logfiles", "Newsletter / Vormerkliste inkl. Double-Opt-in und eingesetztem Dienstleister", "Rechtsgrundlagen der Verarbeitung", "Speicherdauer", "Rechte der betroffenen Personen", "Widerruf der Einwilligung"]}
    />
  );
}
