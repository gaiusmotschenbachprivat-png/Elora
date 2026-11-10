import "server-only";

/**
 * Newsletter-Anbindung
 * ---------------------------------------------------------------
 * Die Website simuliert KEINE Anmeldung. Eine Erfolgsmeldung wird nur
 * angezeigt, wenn ein konfigurierter Anbieter die Übermittlung
 * tatsächlich bestätigt hat. Ohne Konfiguration antwortet die API mit
 * 503 und das Formular zeigt einen ehrlichen Hinweis.
 *
 * Unterstützt:
 *  - Brevo (Double-Opt-in)       → BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID, BREVO_DOI_REDIRECT_URL
 *  - Generischer Webhook          → NEWSLETTER_WEBHOOK_URL (+ optional NEWSLETTER_WEBHOOK_SECRET)
 */

export type SubscribeResult =
  | { ok: true; doubleOptIn: boolean }
  | { ok: false; reason: "not_configured" | "provider_error" };

export interface NewsletterProvider {
  name: string;
  subscribe(email: string): Promise<SubscribeResult>;
}

const TIMEOUT_MS = 8000;

function brevoProvider(): NewsletterProvider | null {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const redirectionUrl = process.env.BREVO_DOI_REDIRECT_URL;
  if (!apiKey || !listId || !templateId || !redirectionUrl) return null;

  return {
    name: "brevo",
    async subscribe(email) {
      const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ email, includeListIds: [listId], templateId, redirectionUrl }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return { ok: true, doubleOptIn: true };
      console.error("[newsletter] Brevo-Fehler", res.status, await res.text().catch(() => ""));
      return { ok: false, reason: "provider_error" };
    },
  };
}

function webhookProvider(): NewsletterProvider | null {
  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) return null;
  const secret = process.env.NEWSLETTER_WEBHOOK_SECRET;
  return {
    name: "webhook",
    async subscribe(email) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret ? { authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({
          email,
          source: "elora-day-landingpage",
          consent: true,
          consentText: "Neuigkeiten zu ELORA DAY und dem Launch per E-Mail",
          timestamp: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return { ok: true, doubleOptIn: false };
      console.error("[newsletter] Webhook-Fehler", res.status);
      return { ok: false, reason: "provider_error" };
    },
  };
}

export function getNewsletterProvider(): NewsletterProvider | null {
  return brevoProvider() ?? webhookProvider();
}
