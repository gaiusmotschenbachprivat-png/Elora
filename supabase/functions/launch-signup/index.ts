// Launch-Registrierung & Newsletter mit Double-Opt-in
// POST { email, consent: true, list: "launch" | "newsletter", productId?, website? }
import { adminClient } from "../_shared/db.ts";
import { brevoConfigured, brevoDoubleOptIn } from "../_shared/brevo.ts";
import { cors, EMAIL_RE, json } from "../_shared/http.ts";

const CONSENT_TEXT = {
  launch: "I would like to receive emails about the launch of ELORA DAY. I can withdraw my consent at any time.",
  newsletter: "I would like to receive emails about the launch of ELORA DAY, new rituals and products. I can withdraw my consent at any time.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, 405, { ok: false });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(req, 400, { ok: false, message: "Invalid request." });
  }

  if (typeof body.website === "string" && body.website) return json(req, 400, { ok: false, message: "Invalid request." });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = body.list === "newsletter" ? "newsletter" : "launch";
  if (!EMAIL_RE.test(email) || email.length > 254) return json(req, 422, { ok: false, message: "Please enter a valid email address." });
  if (body.consent !== true) return json(req, 422, { ok: false, message: "Please confirm your consent." });

  if (!brevoConfigured()) {
    return json(req, 503, { ok: false, message: "Sign-up is not activated yet. Your address has not been stored." });
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
    return json(req, 500, { ok: false, message: "Your sign-up could not be saved. Please try again later." });
  }

  const sent = await brevoDoubleOptIn(email, list).catch(() => false);
  if (!sent) {
    return json(req, 502, { ok: false, message: "The confirmation email could not be sent. Please try again later." });
  }
  return json(req, 200, { ok: true, doubleOptIn: true });
});
