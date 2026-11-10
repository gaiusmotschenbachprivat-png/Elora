# ELORA – Natural Daily Nutrition

Website und D2C-Shop für **ELORA DAY** (geplanter Launch: Frühjahr 2027).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase (Datenbank, Auth, Edge Functions) · Stripe Checkout · Brevo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktionsbuild (Server-Modus, z. B. Vercel)
STATIC_EXPORT=1 npm run build   # statischer Export nach ./out (z. B. GitHub Pages)
npm run lint && npm run typecheck
```

Live (statisch, GitHub Pages): https://gaiusmotschenbachprivat-png.github.io/Elora/ – jeder Push auf den Branch wird automatisch veröffentlicht (`.github/workflows/pages.yml`).

---

## Was vollständig funktioniert (ohne externe Dienste)

| Bereich | Status |
|---|---|
| Startseite, Shop, Produktseite, Philosophie, Inhaltsstoffe, Qualität, FAQ, Kontakt, Rechtsseiten (Platzhalter) | ✅ |
| Navigation inkl. Scroll-Verhalten, mobiles Vollbild-Menü (Fokusfalle, Escape) | ✅ |
| Produktgalerie (Desktop: Thumbnails + Pfeiltasten, mobil: Wischen) | ✅ |
| Warenkorb: hinzufügen, Menge ändern (Bestandsgrenze), entfernen, Zwischensumme/Versand/Gesamt, dauerhafte Speicherung (localStorage, tabübergreifend), Slide-in + eigene Seite | ✅ |
| Checkout-Oberfläche: Adresse, abweichende Rechnungsadresse, Versandart, Gutscheinfeld, Prüfen, AGB-Bestätigung, Validierung & Fehlermeldungen | ✅ |
| Drei Verkaufsmodi mit automatischem Rückfall auf „Launch“, solange Voraussetzungen fehlen | ✅ |
| SEO (Metadaten, Open Graph, Sitemap, robots, JSON-LD), Accessibility, `prefers-reduced-motion` | ✅ |

## Was ein externes Konto braucht

| Funktion | Dienst | Ohne Konto |
|---|---|---|
| Launch-Registrierung & Newsletter (Double-Opt-in) | Supabase + Brevo | Formular zeigt „noch nicht aktiviert“, speichert nichts |
| Kundenkonto (Registrierung, Login, Passwort-Reset, Bestellungen, Adressen, Daten) | Supabase Auth | Seite zeigt „noch nicht aktiviert“ |
| Bestellung / Vorbestellung inkl. Zahlung | Supabase Edge Functions + Stripe | Checkout nicht erreichbar (Launch-Modus) |
| Bestellbestätigung per E-Mail | Brevo (Transaktions-E-Mail) | – |

Es wird **nichts simuliert**: Erfolgsmeldungen erscheinen nur, wenn das Backend die Speicherung bzw. Zahlung bestätigt.

---

## Verkaufsmodi (Launch → Vorbestellung → Verkauf)

| Modus | Verhalten |
|---|---|
| `launch` | „Zum Launch vormerken“ – unverbindliche E-Mail-Registrierung |
| `preorder` | „Vorbestellen“ – Warenkorb + bezahlter Checkout, Liefertermin-Hinweis |
| `sale` | „In den Warenkorb“ – regulärer Verkauf |

**Umschalten ohne Neuentwicklung:** In Supabase die Spalte `products.sales_mode` ändern (Table Editor). Ohne Datenbank gilt `salesMode` in `src/config/shop.ts`.

Ein bezahlter Modus wird **nur wirksam**, wenn alle Voraussetzungen erfüllt sind (`getPurchaseState` in `src/lib/commerce.ts`), sonst bleibt automatisch der Launch-Modus aktiv:

- Preis (`product_variants.price_cents`) und Nettofüllmenge (`net_weight_grams`, für den Grundpreis)
- Versandkosten (`shipping_methods.price_cents` und `src/config/shop.ts`)
- `NEXT_PUBLIC_PAYMENTS_ENABLED=1` und Supabase verbunden
- alle Rechtstexte in `shopConfig.legal` auf `true` (erst nach fachlicher Prüfung!)
- für `preorder`: `preorderDeliveryNote` (voraussichtlicher Liefertermin)
- serverseitig zusätzlich: Secret `CHECKOUT_ENABLED=true` und `STRIPE_SECRET_KEY`

## Produktverwaltung

- Inhalte, Bilder, Varianten: `src/lib/catalog.ts` (weitere Produkte als neuer Eintrag)
- Preis, Bestand, Verkaufsmodus: Supabase-Tabellen `products`, `product_variants` (überschreiben die Katalogwerte live)
- Versandarten: `shipping_methods`; Gutscheine: `coupons`

---

## Einrichtung der Dienste

### 1. Supabase
1. Projekt anlegen (Region EU), dann `supabase link --project-ref <ref>`.
2. Schema einspielen: `supabase db push` (Datei `supabase/migrations/…_init.sql`). Enthält alle Tabellen, Row Level Security und Startdaten (ELORA DAY im Launch-Modus, ohne Preis).
3. Auth → URL Configuration: *Site URL* und *Redirect URLs* auf die Website setzen (inkl. `/konto/` und `/konto/passwort/`). E-Mail-Bestätigung aktiviert lassen; eigenen SMTP-Versand (z. B. Brevo) hinterlegen.
4. Edge Functions deployen: `supabase functions deploy launch-signup checkout stripe-webhook order-status`
5. Secrets setzen (siehe `.env.example`): `supabase secrets set SITE_URL=… ALLOWED_ORIGINS=… BREVO_API_KEY=…`
6. Website-Variablen setzen: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` – für GitHub Pages als Repository-*Variables* (Settings → Secrets and variables → Actions → Variables).

### 2. Brevo
Listen für Launch und Newsletter, ein Double-Opt-in-Template und einen verifizierten Absender anlegen; IDs als Secrets setzen. Bestätigungslink führt auf `/vormerken/bestaetigt/`.

### 3. Stripe
1. `STRIPE_SECRET_KEY` als Supabase-Secret setzen (zuerst Testmodus `sk_test_…`).
2. Webhook-Endpunkt `https://<projekt>.supabase.co/functions/v1/stripe-webhook` mit den Events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired` anlegen; Signing Secret als `STRIPE_WEBHOOK_SECRET` setzen.
3. Nach rechtlicher Freigabe: `CHECKOUT_ENABLED=true`, `NEXT_PUBLIC_PAYMENTS_ENABLED=1`, Preise/Versand pflegen, `sales_mode` umstellen.

**Ablauf einer Bestellung:** Checkout-Formular → Edge Function `checkout` berechnet Preise ausschließlich aus der Datenbank, legt die Bestellung (`pending_payment`) an und erzeugt eine Stripe Checkout Session → Zahlung bei Stripe → Webhook (Signatur geprüft) setzt `paid`, reduziert Bestand, versendet Bestätigung → Bestätigungsseite liest den Status über `order-status`.

---

## Rechtliches – vor dem Verkauf erforderlich

Platzhalter (eckige Klammern) und folgende Inhalte müssen fachlich geprüft ergänzt werden:

- Impressum (§ 5 DDG), Datenschutzerklärung (inkl. Supabase, Stripe, Brevo, lokale Speicherung), AGB, Widerrufsbelehrung inkl. Muster-Widerrufsformular, Versand & Zahlung
- Preisangaben: Endpreis inkl. MwSt., Grundpreis (€/kg), Versandkosten (PAngV) – technisch vorbereitet
- Lebensmittelkennzeichnung (LMIV/NemV): Zutatenliste, Nährwerte pro Portion inkl. % NRV, Verzehrempfehlung, Warnhinweise, Hersteller
- Gesundheitsbezogene Angaben: nur die hinterlegten zugelassenen Angaben (VO (EU) 432/2012) und nur bei Erfüllung der Bedingungen
- Steuersatz (`tax_rate`, Standardwert 7 % – steuerlich prüfen)
- Cookie-/Tracking-Einwilligung: derzeit kein Tracking und keine Marketing-Cookies; nur technisch notwendige lokale Speicherung. Bei späterem Tracking ist ein Consent-Banner nötig.
- Bestätigungs-E-Mail: Pflichtangaben/Widerrufsbelehrung ergänzen (`supabase/functions/stripe-webhook`)

---

## Bildwelt

Alle Produktbilder sind **Konzeptvisualisierungen (Mockups)** – fotorealistische 3D-Renderings, nicht die finale Verpackung, und auf der Website entsprechend gekennzeichnet. Responsive WebP-Varianten liegen in `public/images` (`scripts/images.py`). Echte Kampagnenfotos können mit denselben Dateinamen ersetzt werden.

## Designsystem

- Typografie: Bodoni Moda (Display, Kursiv-Akzente) · Hanken Grotesk (Text/UI) · IBM Plex Mono (Spezifikationen, Status)
- Farben: Ivory `#F5F1E9`, Sand `#E9E1D4`, Salbei `#87927A`, Waldgrün `#465641`, Citrus `#C78B43` (punktuell), Anthrazit `#292B28`
- Tokens & Utilities: `src/app/globals.css`
