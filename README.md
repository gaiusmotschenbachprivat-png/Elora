# ELORA – Website (ELORA DAY Landingpage)

Landingpage für **ELORA DAY**, das erste Produkt der Marke ELORA (*Natural Daily Nutrition*).
Geplanter Launch: Frühjahr 2027.

## Tech-Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (Design-Tokens in `src/app/globals.css`)
- Schriften über `next/font`: **Jost** (Headlines, Wortmarke) und **Manrope** (Fließtext)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Struktur

```
src/
  app/                 Layout, Startseite, API-Route, Rechtsseiten (Platzhalter), SEO (sitemap/robots/icon)
  components/
    layout/            Header (sticky + Mobile-Menü), Footer, Wortmarke
    sections/          Hero, Benefits, Ingredients, Preparation, Philosophy, Quality, Newsletter, Faq
    ui/                Button, Accordion, SignupForm, Reveal, Icons, Placeholder, SectionHeading
    art/               Illustrierte Bildwelt (SVG): Dose, Citrus, Ingwer, Glas, Travertin
  lib/
    site.ts            Navigation, URL, Launch-Datum
    content.ts         Inhaltsstoffe, Health Claims, FAQ – zentrale Pflegestelle
    newsletter/        Anbieter-Anbindung (Brevo / Webhook)
```

## Inhalte & Platzhalter

Rezeptur, Mengen, Rohstoffformen und Kennzeichnung sind **noch nicht final**.

- Werte in eckigen Klammern (z. B. `[— mg]`) sind Platzhalter (`<Placeholder>`), optisch klar gekennzeichnet.
- Gesundheitsbezogene Angaben in `src/lib/content.ts` sind wörtliche zugelassene Angaben nach
  VO (EU) Nr. 432/2012. Sie dürfen nur bleiben, wenn die finale Rezeptur die Bedingungen erfüllt
  (i. d. R. ≥ 15 % NRV pro Portion). Für Natrium gibt es keine zugelassene Angabe – daher keine Wirkaussage.
- Keine Zertifizierungen, Laboranalysen, Bewertungen oder Unternehmensdaten wurden erfunden.
- Impressum, Datenschutz, AGB und Widerruf sind Platzhalterseiten (`noindex`) und müssen vor
  Veröffentlichung rechtlich geprüft befüllt werden; ebenso die Kontaktadresse und Social-Media-Profile im Footer.

**Vor Livegang bitte lebensmittel- und wettbewerbsrechtlich prüfen lassen.**

## Newsletter / Vormerken

`POST /api/subscribe` validiert E-Mail und Einwilligung (plus Honeypot) und leitet an einen Anbieter weiter.
Es wird **keine Anmeldung simuliert**: Ohne Konfiguration antwortet die API mit `503` und das Formular
zeigt einen ehrlichen Hinweis. Konfiguration über Umgebungsvariablen (siehe `.env.example`):

- **Brevo (Double-Opt-in, empfohlen):** `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`, `BREVO_DOI_REDIRECT_URL`
- **Webhook:** `NEWSLETTER_WEBHOOK_URL` (+ optional `NEWSLETTER_WEBHOOK_SECRET` als Bearer-Token)

Weitere Anbieter lassen sich in `src/lib/newsletter/index.ts` ergänzen.

## Bildwelt

Die Produktinszenierung ist als SVG-Illustration umgesetzt (gestochen scharf, wenige KB, exakt in der
Markenpalette). Das Verpackungsdesign ist als Konzept gekennzeichnet. Sobald echte Kampagnenfotografie
vorliegt, können die Kompositionen in `src/components/art/compositions.tsx` (`HeroStill`, `GlassStill`,
`RitualStill`) durch `next/image` ersetzt werden.

## Farbpalette

| Token        | Hex       |
|--------------|-----------|
| cream        | `#F5F1E9` |
| sand         | `#E9E1D4` |
| sage         | `#87927A` |
| forest       | `#465641` |
| citrus       | `#C78B43` |
| ink          | `#292B28` |
