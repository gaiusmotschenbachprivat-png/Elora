// Launch-Registrierung & Newsletter mit Double-Opt-in
// POST { email, consent: true, list: "launch" | "newsletter", productId?, website? }
import { adminClient } from "../_shared/db.ts";
import { brevoConfigured, brevoDoubleOptIn } from "../_shared/brevo.ts";
import { cors, EMAIL_RE, json } from "../_shared/http.ts";

const CONSENT_TEXT = {
  launch: "Ich möchte per E-Mail über den Launch von ELORA DAY informiert werden. Die Einwilligung kann ich jederzeit widerrufen.",
  newsletter: "Ich möchte per E-Mail über den Launch von ELORA DAY und neue Produkte informiert werden. Die Einwilligung kann ich jederzeit widerrufen.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, 405, { ok: false });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(req, 400, { ok: false, message: "Ungültige Anfrage." });
  }

  if (typeof body.website === "string" && body.website) return json(req, 400, { ok: false, message: "Ungültige Anfrage." });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = body.list === "newsletter" ? "newsletter" : "launch";
  if (!EMAIL_RE.test(email) || email.length > 254) return json(req, 422, { ok: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." });
  if (body.consent !== true) return json(req, 422, { ok: false, message: "Bitte bestätige deine Einwilligung." });

  if (!brevoConfigured()) {
    return json(req, 503, { ok: false, message: "Die Registrierung ist noch nicht aktiviert. Deine Adresse wurde nicht gespeichert." });
  }

  const db = adminClient();
  const { error } = await db.from("launch_signups").upsert(
    {
      email,
      list,
      product_id: typeof body.productId === "string" ? body.productId : null,
      consent_text: CONSENT_TEXT[list],
      consent_at: new Date().toISOString(),
      status: "pending_confirmation",
    },
    { onConflict: "email,list" },
  );
  if (error) {
    console.error("[launch-signup] db", error);
    return json(req, 500, { ok: false, message: "Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es später erneut." });
  }

  const sent = await brevoDoubleOptIn(email, list).catch(() => false);
  if (!sent) {
    return json(req, 502, { ok: false, message: "Die Bestätigungs-E-Mail konnte nicht versendet werden. Bitte versuche es später erneut." });
  }
  return json(req, 200, { ok: true, doubleOptIn: true });
});
