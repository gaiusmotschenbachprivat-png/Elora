import { env } from "./http.ts";

const API = "https://api.brevo.com/v3";

export function brevoConfigured() {
  return Boolean(env("BREVO_API_KEY") && env("BREVO_DOI_TEMPLATE_ID") && env("BREVO_DOI_REDIRECT_URL") && (env("BREVO_LAUNCH_LIST_ID") || env("BREVO_NEWSLETTER_LIST_ID")));
}

/** Double-Opt-in: Brevo verschickt die Bestätigungs-E-Mail und trägt erst nach Klick ein. */
export async function brevoDoubleOptIn(email: string, list: "launch" | "newsletter") {
  const listId = Number(list === "launch" ? env("BREVO_LAUNCH_LIST_ID") ?? env("BREVO_NEWSLETTER_LIST_ID") : env("BREVO_NEWSLETTER_LIST_ID") ?? env("BREVO_LAUNCH_LIST_ID"));
  const res = await fetch(`${API}/contacts/doubleOptinConfirmation`, {
    method: "POST",
    headers: { "api-key": env("BREVO_API_KEY")!, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email,
      includeListIds: [listId],
      templateId: Number(env("BREVO_DOI_TEMPLATE_ID")),
      redirectionUrl: env("BREVO_DOI_REDIRECT_URL"),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error("[brevo] DOI", res.status, await res.text().catch(() => ""));
  return res.ok;
}

/** Transaktions-E-Mail (z. B. Bestellbestätigung). */
export async function brevoSend(to: string, subject: string, html: string) {
  if (!env("BREVO_API_KEY") || !env("BREVO_SENDER_EMAIL")) {
    console.warn("[brevo] Versand nicht konfiguriert – E-Mail nicht gesendet:", subject);
    return false;
  }
  const res = await fetch(`${API}/smtp/email`, {
    method: "POST",
    headers: { "api-key": env("BREVO_API_KEY")!, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: env("BREVO_SENDER_EMAIL"), name: env("BREVO_SENDER_NAME") ?? "ELORA" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error("[brevo] send", res.status, await res.text().catch(() => ""));
  return res.ok;
}
