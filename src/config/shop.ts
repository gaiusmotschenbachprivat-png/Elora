/**
 * ELORA – zentrale Shop-Konfiguration
 * =====================================================================
 * Hier wird festgelegt, in welchem Verkaufsmodus sich der Shop befindet.
 *
 *   "launch"   – Launch-Registrierung: unverbindliche Vormerkung per E-Mail
 *   "preorder" – Bezahlte Vorbestellung über den Checkout
 *   "sale"     – Regulärer Verkauf
 *
 * Ist Supabase verbunden, gilt der Modus aus der Datenbank (Tabelle
 * `products.sales_mode`) – er lässt sich dort ohne neues Deployment
 * umstellen. Dieser Wert ist die Rückfallebene ohne Datenbank.
 *
 * WICHTIG: Ein bezahlter Modus ("preorder"/"sale") wird nur wirksam, wenn
 * ALLE Voraussetzungen unten erfüllt sind. Andernfalls fällt der Shop
 * automatisch auf "launch" zurück (siehe `getPurchaseState`).
 */

export type SalesMode = "launch" | "preorder" | "sale";

export const shopConfig = {
  /** Gewünschter Modus, solange keine Datenbank verbunden ist. */
  salesMode: "launch" as SalesMode,

  currency: "EUR",
  locale: "de-DE",

  /**
   * Rechtliche Freigaben – erst auf `true` setzen, wenn die Texte
   * fachlich geprüft und auf der Website veröffentlicht sind.
   */
  legal: {
    impressum: false,
    datenschutz: false,
    agb: false,
    widerruf: false,
    versandinformationen: false,
    lebensmittelkennzeichnung: false,
  },

  /**
   * Zahlungen: wird über die Umgebungsvariable NEXT_PUBLIC_PAYMENTS_ENABLED
   * aktiviert, sobald Stripe und die Edge Functions eingerichtet sind.
   */
  paymentsEnabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "1",

  /** Versandarten (Anzeige). Verbindlich sind die Werte in der Datenbank. */
  shipping: {
    countries: [
      { code: "DE", label: "Deutschland" },
      { code: "AT", label: "Österreich" },
    ],
    methods: [
      {
        id: "standard",
        label: "Standardversand",
        priceCents: null as number | null,
        deliveryNote: "[Lieferzeit wird vor dem Launch festgelegt]",
      },
    ],
    freeShippingThresholdCents: null as number | null,
  },

  /** Hinweis zum Liefertermin bei Vorbestellungen (Pflicht für "preorder"). */
  preorderDeliveryNote: null as string | null,

  /** Maximale Menge pro Bestellposition. */
  maxQuantityPerLine: 6,
} as const;
