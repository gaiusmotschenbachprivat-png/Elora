export const site = {
  name: "ELORA",
  category: "Natural Daily Nutrition",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "ELORA – Natural Daily Nutrition. ELORA DAY: ein Getränkepulver mit ausgewählten Elektrolyten und Mikronährstoffen für einen bewussten Start in den Tag. Ohne Koffein, ohne Taurin. Geplanter Launch: Frühjahr 2027.",
  launch: "Frühjahr 2027",
} as const;

export const mainNav = [
  { label: "Shop", href: "/shop/" },
  { label: "Unsere Philosophie", href: "/philosophie/" },
  { label: "Inhaltsstoffe", href: "/inhaltsstoffe/" },
  { label: "Qualität", href: "/qualitaet/" },
] as const;

export const footerNav = {
  shop: [
    { label: "Alle Produkte", href: "/shop/" },
    { label: "ELORA DAY", href: "/produkte/elora-day/" },
    { label: "Warenkorb", href: "/warenkorb/" },
    { label: "Kundenkonto", href: "/konto/" },
  ],
  about: [
    { label: "Unsere Philosophie", href: "/philosophie/" },
    { label: "Inhaltsstoffe", href: "/inhaltsstoffe/" },
    { label: "Qualität & Transparenz", href: "/qualitaet/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Kontakt", href: "/kontakt/" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum/" },
    { label: "Datenschutz", href: "/datenschutz/" },
    { label: "AGB", href: "/agb/" },
    { label: "Widerruf", href: "/widerruf/" },
    { label: "Versand & Zahlung", href: "/versand/" },
  ],
} as const;
