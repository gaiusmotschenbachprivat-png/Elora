import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = { title: "Widerrufsbelehrung", robots: { index: false, follow: true } };

export default function Page() {
  return <LegalPage title="Widerrufsbelehrung" intro="Die Widerrufsbelehrung wird vor Aktivierung von Vorbestellung oder Verkauf veröffentlicht." sections={["Widerrufsrecht", "Folgen des Widerrufs", "Ausschluss bzw. vorzeitiges Erlöschen (z. B. entsiegelte Lebensmittel)", "Muster-Widerrufsformular"]} />;
}
