import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop/", "/philosophie/", "/inhaltsstoffe/", "/qualitaet/", "/faq/", "/kontakt/", ...products.map((p) => `/produkte/${p.slug}/`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
