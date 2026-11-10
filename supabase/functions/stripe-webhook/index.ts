// Stripe-Webhook: markiert Bestellungen als bezahlt/abgebrochen, reduziert Bestand, versendet Bestätigung
import { adminClient } from "../_shared/db.ts";
import { brevoSend } from "../_shared/brevo.ts";
import { env } from "../_shared/http.ts";
import { verifyStripeSignature } from "../_shared/stripe.ts";

const eur = (c: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(c / 100);

Deno.serve(async (req) => {
  const secret = env("STRIPE_WEBHOOK_SECRET");
  if (!secret) return new Response("not configured", { status: 503 });
  const payload = await req.text();
  if (!(await verifyStripeSignature(payload, req.headers.get("stripe-signature"), secret))) {
    return new Response("invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: { id: string; payment_status?: string; payment_intent?: string; metadata?: { order_id?: string } } } };
  const session = event.data.object;
  const orderId = session.metadata?.order_id;
  if (!orderId) return new Response("ignored", { status: 200 });
  const db = adminClient();

  if ((event.type === "checkout.session.completed" && session.payment_status === "paid") || event.type === "checkout.session.async_payment_succeeded") {
    // Idempotent: nur ausstehende Bestellungen umstellen
    const { data: order } = await db
      .from("orders")
      .update({ status: "paid", paid_at: new Date().toISOString(), stripe_payment_intent: session.payment_intent ?? null })
      .eq("id", orderId)
      .eq("status", "pending_payment")
      .select("id, number, email, kind, total_cents, coupon_code, order_items(variant_id, name, qty, line_cents)")
      .maybeSingle();

    if (order) {
      for (const it of order.order_items as { variant_id: string; qty: number }[]) {
        await db.rpc("decrement_stock", { p_variant: it.variant_id, p_qty: it.qty });
      }
      if (order.coupon_code) {
        const { data: c } = await db.from("coupons").select("redemptions").eq("code", order.coupon_code).single();
        if (c) await db.from("coupons").update({ redemptions: c.redemptions + 1 }).eq("code", order.coupon_code);
      }
      const rows = (order.order_items as { name: string; qty: number; line_cents: number }[])
        .map((i) => `<tr><td style="padding:6px 0">${i.qty} × ${i.name}</td><td style="text-align:right">${eur(i.line_cents)}</td></tr>`)
        .join("");
      await brevoSend(
        order.email,
        `${order.kind === "preorder" ? "Deine Vorbestellung" : "Deine Bestellung"} ${order.number} bei ELORA`,
        `<div style="font-family:Helvetica,Arial,sans-serif;color:#292b28;max-width:520px">
          <p style="letter-spacing:.4em;font-size:18px">ELORA</p>
          <h1 style="font-weight:400">Danke für deine ${order.kind === "preorder" ? "Vorbestellung" : "Bestellung"}.</h1>
          <p>Bestellnummer: <strong>${order.number}</strong></p>
          <table style="width:100%;border-top:1px solid #d9d0c1;border-bottom:1px solid #d9d0c1">${rows}</table>
          <p style="text-align:right">Gesamt: <strong>${eur(order.total_cents)}</strong></p>
          <p style="color:#73766d;font-size:12px">[Pflichtangaben, Widerrufsbelehrung und AGB werden vor Verkaufsstart ergänzt.]</p>
        </div>`,
      ).catch(() => false);
    }
  }

  if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
    await db.from("orders").update({ status: "cancelled" }).eq("id", orderId).eq("status", "pending_payment");
  }

  return new Response("ok", { status: 200 });
});
