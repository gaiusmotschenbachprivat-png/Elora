/**
 * Zentrale Inhalte für ELORA DAY.
 *
 * WICHTIG: Rezeptur, Nährstoffmengen, Rohstoffformen und Kennzeichnung
 * befinden sich in Entwicklung. Alle Werte in eckigen Klammern sind
 * Platzhalter und müssen vor Veröffentlichung durch geprüfte Daten
 * (inkl. lebensmittelrechtlicher Prüfung) ersetzt werden.
 *
 * Gesundheitsbezogene Angaben stammen wörtlich aus der Liste zugelassener
 * Angaben gemäß VO (EU) Nr. 432/2012. Sie dürfen nur verwendet werden,
 * wenn die finale Rezeptur die jeweiligen Bedingungen (i. d. R. mind. 15 %
 * des Nährstoffbezugswerts pro Portion) erfüllt.
 */

export type Ingredient = {
  symbol: string;
  name: string;
  optional?: boolean;
  role: string;
  claims: string[];
  note?: string;
};

export const ingredients: Ingredient[] = [
  {
    symbol: "K",
    name: "Kalium",
    role: "Mineralstoff und einer der wichtigsten Elektrolyte des Körpers.",
    claims: [
      "Kalium trägt zur Aufrechterhaltung eines normalen Blutdrucks bei.",
      "Kalium trägt zu einer normalen Muskelfunktion bei.",
    ],
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    role: "Mineralstoff, der an zahlreichen Prozessen im Körper beteiligt ist.",
    claims: [
      "Magnesium trägt zum Elektrolytgleichgewicht bei.",
      "Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung bei.",
    ],
  },
  {
    symbol: "Na",
    name: "Natrium",
    role: "Mineralstoff und Elektrolyt, der natürlicherweise in vielen Lebensmitteln vorkommt.",
    claims: [],
    note: "Für Natrium existiert keine zugelassene gesundheitsbezogene Angabe – wir verzichten deshalb bewusst auf Wirkaussagen.",
  },
  {
    symbol: "C",
    name: "Vitamin C",
    role: "Wasserlösliches Vitamin, klassisch verbunden mit Citrusfrüchten.",
    claims: [
      "Vitamin C trägt zu einer normalen Funktion des Immunsystems bei.",
      "Vitamin C trägt zur Verringerung von Müdigkeit und Ermüdung bei.",
    ],
  },
  {
    symbol: "B12",
    name: "Vitamin B12",
    optional: true,
    role: "Wasserlösliches Vitamin. Ob es Teil der finalen Rezeptur wird, ist noch offen.",
    claims: ["Vitamin B12 trägt zu einem normalen Energiestoffwechsel bei."],
  },
];

export type FaqItem = {
  q: string;
  /** "fixed" = festgelegter Konzeptgrundsatz, "preliminary" = vorläufig */
  status: "fixed" | "preliminary" | "planned";
  a: string[];
};

export const faq: FaqItem[] = [
  {
    q: "Was ist ELORA DAY?",
    status: "fixed",
    a: [
      "ELORA DAY ist das erste Produkt von ELORA: ein Getränkepulver, das mit Wasser angerührt wird und für die morgendliche Anwendung gedacht ist. Es kombiniert ausgewählte Elektrolyte und Mikronährstoffe mit einem erfrischenden Citrus-Ingwer-Geschmack.",
      "Das Produkt befindet sich aktuell in der Entwicklung und ist noch nicht erhältlich.",
    ],
  },
  {
    q: "Welche Inhaltsstoffe sind enthalten?",
    status: "preliminary",
    a: [
      "Geplant sind die Elektrolyte Kalium, Magnesium und Natrium sowie Vitamin C. Ob zusätzlich Vitamin B12 enthalten sein wird, ist noch offen. Für den Geschmack setzen wir auf Citrus mit einer dezenten Ingwernote und eine möglichst natürliche Rezeptur.",
      "Die endgültige Rezeptur, die Nährstoffmengen und die Rohstoffformen werden derzeit entwickelt. Sobald sie feststehen, veröffentlichen wir die vollständige Zutatenliste und Nährwerttabelle.",
    ],
  },
  {
    q: "Enthält ELORA DAY Koffein?",
    status: "fixed",
    a: [
      "Nein. ELORA DAY wird bewusst ohne Koffein und ohne Taurin entwickelt. Auch auf unnötige künstliche Zusätze möchten wir verzichten.",
    ],
  },
  {
    q: "Wie wird ELORA DAY zubereitet?",
    status: "preliminary",
    a: [
      "Eine Portion Pulver wird in kaltem Wasser aufgelöst, kurz umgerührt – fertig.",
      "Die genaue Portionsgröße und die empfohlene Wassermenge legen wir mit der finalen Rezeptur fest. Bis dahin gilt: Portion [— g] auf [— ml] Wasser.",
    ],
  },
  {
    q: "Für wen ist das Produkt gedacht?",
    status: "preliminary",
    a: [
      "ELORA DAY richtet sich an Erwachsene, die ihren Morgen bewusst gestalten und ihre Ernährung im Alltag unkompliziert ergänzen möchten.",
      "Konkrete Verzehrempfehlungen und Hinweise – etwa für Schwangere, Stillende oder bei der Einnahme von Medikamenten – werden mit der finalen Kennzeichnung festgelegt. Im Zweifel empfehlen wir Rücksprache mit einer Ärztin oder einem Arzt.",
    ],
  },
  {
    q: "Wann erscheint ELORA DAY?",
    status: "planned",
    a: [
      "Der Markteintritt ist derzeit für das Frühjahr 2027 geplant. Wenn du dich vormerkst, informieren wir dich, sobald es Neuigkeiten gibt – ganz ohne Verpflichtung.",
    ],
  },
  {
    q: "Wie viele Portionen enthält eine Verpackung?",
    status: "preliminary",
    a: [
      "Geplant ist eine Verpackung mit etwa 30 Portionen – also ungefähr ein Monat bei täglicher Anwendung. Füllmenge und Verpackungsformat werden mit der finalen Rezeptur bestätigt.",
    ],
  },
];

export const faqStatusLabel: Record<FaqItem["status"], string> = {
  fixed: "Festgelegt",
  preliminary: "Vorläufig",
  planned: "Geplant",
};
