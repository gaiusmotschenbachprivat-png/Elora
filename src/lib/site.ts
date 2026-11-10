export const site = {
  name: "ELORA",
  product: "ELORA DAY",
  category: "Natural Daily Nutrition",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "ELORA DAY – ein erfrischendes Getränkepulver mit ausgewählten Elektrolyten und Mikronährstoffen für einen bewussten Start in den Tag. Ohne Koffein, ohne Taurin. Geplanter Launch: Frühjahr 2027.",
  launch: "Frühjahr 2027",
} as const;

export const nav = [
  { label: "Produkt", href: "/#produkt" },
  { label: "Unsere Philosophie", href: "/#philosophie" },
  { label: "Wissenschaft & Qualität", href: "/#qualitaet" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Widerruf", href: "/widerruf" },
] as const;

export const signupHref = "/#vormerken";
