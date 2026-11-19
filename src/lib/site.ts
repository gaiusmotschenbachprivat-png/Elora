export const site = {
  name: "ELORA",
  category: "Premium Daily Wellness",
  slogan: "The Art of Daily Balance.",
  secondary: "A daily ritual. Thoughtfully made.",
  positioning: "Japanese-inspired wellness. European quality.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "ELORA – The Art of Daily Balance. Japanese-inspired wellness, European quality. ELORA DAY is a citrus ginger drink powder with selected electrolytes and micronutrients for your morning ritual. Planned launch: spring 2027.",
  launch: "Spring 2027",
} as const;

export const mainNav = [
  { label: "Shop", href: "/shop/" },
  { label: "Philosophy", href: "/philosophie/" },
  { label: "Ritual", href: "/#ritual" },
  { label: "Ingredients", href: "/inhaltsstoffe/" },
  { label: "Quality", href: "/qualitaet/" },
] as const;

export const footerNav = {
  shop: [
    { label: "Shop", href: "/shop/" },
    { label: "ELORA DAY", href: "/produkte/elora-day/" },
    { label: "Cart", href: "/warenkorb/" },
    { label: "Account", href: "/konto/" },
  ],
  about: [
    { label: "Our Philosophy", href: "/philosophie/" },
    { label: "Ingredients", href: "/inhaltsstoffe/" },
    { label: "Quality", href: "/qualitaet/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Contact", href: "/kontakt/" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum/" },
    { label: "Datenschutz", href: "/datenschutz/" },
    { label: "AGB", href: "/agb/" },
    { label: "Widerrufsbelehrung", href: "/widerruf/" },
    { label: "Versandinformationen", href: "/versand/" },
  ],
} as const;
