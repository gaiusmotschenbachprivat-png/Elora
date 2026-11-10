import { NextResponse } from "next/server";
import { getNewsletterProvider } from "@/lib/newsletter";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, message: "Ungültige Anfrage." });
  }

  const { email, consent, website } = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: Bots füllen das versteckte Feld aus – wir verwerfen still,
  // ohne einen Anbieter aufzurufen.
  if (typeof website === "string" && website.length > 0) {
    return json(400, { ok: false, message: "Die Anmeldung konnte nicht verarbeitet werden." });
  }

  const normalized = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!normalized || normalized.length > 254 || !EMAIL_RE.test(normalized)) {
    return json(422, { ok: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." });
  }
  if (consent !== true) {
    return json(422, { ok: false, message: "Bitte bestätige deine Einwilligung." });
  }

  const provider = getNewsletterProvider();
  if (!provider) {
    return json(503, {
      ok: false,
      code: "not_configured",
      message:
        "Die Vormerkliste wird gerade eingerichtet und nimmt noch keine Anmeldungen entgegen. Bitte schau in Kürze wieder vorbei.",
    });
  }

  try {
    const result = await provider.subscribe(normalized);
    if (result.ok) return json(200, { ok: true, doubleOptIn: result.doubleOptIn });
  } catch (err) {
    console.error(`[newsletter] ${provider.name} nicht erreichbar`, err);
  }
  return json(502, {
    ok: false,
    message: "Deine Anmeldung konnte gerade nicht übermittelt werden. Bitte versuche es später erneut.",
  });
}
