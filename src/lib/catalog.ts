/**
 * Produktkatalog – zentrale Produktverwaltung (Inhalte, Bilder, Varianten).
 *
 * Inhaltliche Daten (Texte, Bilder) liegen hier. Kaufmännische Daten
 * (Preis, Bestand, Verkaufsmodus) kommen – sobald Supabase verbunden ist –
 * aus der Datenbank und überschreiben die Werte hier (siehe `useProduct`).
 *
 * Neue Produkte (z. B. weitere Sorten) werden einfach als weiterer Eintrag
 * in `products` ergänzt; Shop, Produktseite und Warenkorb übernehmen sie.
 */
import type { SalesMode } from "@/config/shop";

export type ProductImage = {
  /** Dateiname ohne Größe/Endung in /public/images, z. B. "pack-front" */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Variant = {
  id: string;
  name: string;
  sku: string | null;
  servings: string;
  /** Bruttopreis in Cent. `null` = noch nicht festgelegt. */
  priceCents: number | null;
  /** Nettofüllmenge in Gramm – für den Grundpreis (€/kg). */
  netWeightGrams: number | null;
  /** Lagerbestand. `null` = unbekannt / nicht gepflegt. */
  stock: number | null;
};

export type ProductStatus = "in-development" | "available" | "archived";

export type Product = {
  id: string;
  slug: string;
  name: string;
  line: string;
  tagline: string;
  description: string;
  flavor: string;
  status: ProductStatus;
  /** Rückfall-Verkaufsmodus, falls keine Datenbank verbunden ist. */
  salesMode: SalesMode | null;
  launch: string;
  images: ProductImage[];
  variants: Variant[];
};

export const products: Product[] = [
  {
    id: "elora-day",
    slug: "elora-day",
    name: "ELORA DAY",
    line: "N° 01",
    tagline: "Durchdachte Nutrition für einen bewussten Start in den Tag.",
    description:
      "Ein Getränkepulver für den Morgen: ausgewählte Elektrolyte und Mikronährstoffe, aufgelöst in kaltem Wasser, mit einem klaren Geschmack von Citrus und einer leisen Note Ingwer. Ohne Koffein, ohne Taurin.",
    flavor: "Citrus & Ingwer",
    status: "in-development",
    salesMode: null,
    launch: "Frühjahr 2027",
    images: [
      {
        src: "pack-front",
        alt: "Konzeptvisualisierung: Dose ELORA DAY auf hellem Travertin im Morgenlicht",
        width: 1600,
        height: 2000,
      },
      {
        src: "pack-glass",
        alt: "Konzeptvisualisierung: ELORA DAY neben einem zubereiteten Glas mit Eis und Orange",
        width: 1600,
        height: 2000,
      },
      {
        src: "macro",
        alt: "Konzeptvisualisierung: aufgeschnittene Orange, Ingwer und Pulver auf Travertin in Nahaufnahme",
        width: 1600,
        height: 2000,
      },
      {
        src: "flatlay",
        alt: "Konzeptvisualisierung von oben: Dose, Pulver, Orange, Zitrone und Ingwer auf Leinen",
        width: 1600,
        height: 2000,
      },
      {
        src: "glass",
        alt: "Konzeptvisualisierung: ein Glas ELORA DAY mit Eiswürfeln",
        width: 1600,
        height: 2000,
      },
    ],
    variants: [
      {
        id: "elora-day-30",
        name: "Dose",
        sku: null,
        servings: "ca. 30 Portionen",
        priceCents: null,
        netWeightGrams: null,
        stock: null,
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function findVariant(variantId: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}
