import type { Metadata } from "next";
import { LegalPlaceholder } from "../LegalPlaceholder";

export const metadata: Metadata = { title: "Widerrufsbelehrung", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <LegalPlaceholder
      title="Widerrufsbelehrung"
      intro="Die Widerrufsbelehrung wird mit dem Start des Verkaufs von ELORA DAY veröffentlicht."
      sections={["Widerrufsrecht", "Folgen des Widerrufs", "Ausschluss bzw. vorzeitiges Erlöschen (z. B. versiegelte Lebensmittel)", "Muster-Widerrufsformular"]}
    />
  );
}
