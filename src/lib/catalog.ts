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
    tagline: "A refreshing citrus ginger drink powder designed for your daily morning ritual.",
    description:
      "A thoughtfully formulated daily drink with selected electrolytes and micronutrients. Mixed with cold water, with a clear taste of citrus and a gentle note of ginger. Without caffeine, without taurine.",
    flavor: "Citrus & Ginger",
    status: "in-development",
    salesMode: null,
    launch: "Spring 2027",
    images: [
      { src: "pack-front", alt: "Concept visualisation: the ELORA DAY tin on travertine in soft morning light with shoji shadows", width: 1600, height: 2000 },
      { src: "pack-glass", alt: "Concept visualisation: ELORA DAY on a light wooden board next to a prepared glass and a halved citrus fruit", width: 1600, height: 2000 },
      { src: "macro", alt: "Concept visualisation: close-up of halved citrus fruit, fresh ginger and drink powder on wood", width: 1600, height: 2000 },
      { src: "flatlay", alt: "Concept visualisation from above: tin, ceramic cup, citrus, ginger, a wooden spoon and a glass on linen", width: 1600, height: 2000 },
      { src: "ritual-begin", alt: "Concept visualisation: a glass of ELORA DAY with ice next to a halved citrus fruit", width: 1200, height: 1500 },
    ],
    variants: [
      {
        id: "elora-day-30",
        name: "Tin",
        sku: null,
        servings: "servings to be confirmed",
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
