// Bestellstatus für die Bestätigungsseite (über die nicht erratbare Stripe-Session-ID)
import { adminClient } from "../_shared/db.ts";
import { cors, json } from "../_shared/http.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, 405, {});
  const { sessionId } = await req.json().catch(() => ({}));
  if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) return json(req, 422, { message: "Ungültige Bestellung." });

  const { data: o } = await adminClient()
    .from("orders")
    .select("number, status, kind, total_cents, email, order_items(name, qty, line_cents)")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (!o) return json(req, 404, { message: "Wir konnten die Bestellung nicht finden." });

  // E-Mail-Adresse nur maskiert zurückgeben
  const [user, domain] = (o.email as string).split("@");
  return json(req, 200, {
    order: {
      number: o.number,
      status: o.status,
      kind: o.kind,
      totalCents: o.total_cents,
      email: `${user.slice(0, 2)}…@${domain}`,
      items: (o.order_items as { name: string; qty: number; line_cents: number }[]).map((i) => ({ name: i.name, qty: i.qty, lineCents: i.line_cents })),
    },
  });
});
