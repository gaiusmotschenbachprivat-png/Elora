// Checkout: serverseitige Preisberechnung, Bestellung anlegen, Stripe Checkout Session erzeugen
// POST { action: "quote" | "create", items: [{variantId, qty}], shippingMethod, coupon?, country?,
//        email?, shippingAddress?, billingAddress?, acceptTerms? }
import { adminClient, userFromRequest } from "../_shared/db.ts";
import { cors, EMAIL_RE, env, json } from "../_shared/http.ts";
import { stripe } from "../_shared/stripe.ts";

type Item = { variantId: string; qty: number };
type Address = { firstName: string; lastName: string; street: string; addition?: string; zip: string; city: string; country: string };

const MAX_QTY = 6;

function validAddress(a: unknown): a is Address {
  if (!a || typeof a !== "object") return false;
  const x = a as Record<string, unknown>;
  const s = (k: string) => typeof x[k] === "string" && (x[k] as string).trim().length > 0 && (x[k] as string).length < 200;
  const zipOk = x.country === "AT" ? /^\d{4}$/.test(String(x.zip)) : x.country === "DE" && /^\d{5}$/.test(String(x.zip));
  return s("firstName") && s("lastName") && s("street") && s("city") && zipOk;
}

/** Übernimmt nur erlaubte Felder (keine beliebigen Zusatzdaten in der Datenbank). */
function cleanAddress(a: Address): Address {
  const t = (v: unknown) => String(v ?? "").trim().slice(0, 120);
  return { firstName: t(a.firstName), lastName: t(a.lastName), street: t(a.street), addition: t(a.addition), zip: t(a.zip), city: t(a.city), country: a.country === "AT" ? "AT" : "DE" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, 405, {});

  // Betreiber-Freigabe: Checkout erst nach Prüfung von Recht, Preis und Lieferbedingungen aktivieren
  if (env("CHECKOUT_ENABLED") !== "true" || !env("STRIPE_SECRET_KEY") || !env("SITE_URL")) {
    return json(req, 503, { message: "Der Checkout ist noch nicht aktiviert. Es wurde keine Bestellung ausgelöst." });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(req, 400, { message: "Ungültige Anfrage." });
  }

  const items = Array.isArray(body.items) ? (body.items as Item[]) : [];
  if (!items.length || items.length > 20 || items.some((i) => typeof i.variantId !== "string" || !Number.isInteger(i.qty) || i.qty < 1 || i.qty > MAX_QTY)) {
    return json(req, 422, { message: "Der Warenkorb ist ungültig." });
  }

  const db = adminClient();

  // Varianten + Produkte laden – Preise kommen ausschließlich aus der Datenbank
  const { data: variants, error: vErr } = await db
    .from("product_variants")
    .select("id, name, price_cents, net_weight_grams, stock, active, products(id, name, sales_mode, active)")
    .in("id", items.map((i) => i.variantId));
  if (vErr) return json(req, 500, { message: "Produkte konnten nicht geladen werden." });

  const lines = [];
  const kinds = new Set<string>();
  for (const it of items) {
    const v = (variants ?? []).find((x) => x.id === it.variantId) as
      | { id: string; name: string; price_cents: number | null; net_weight_grams: number | null; stock: number | null; active: boolean; products: { id: string; name: string; sales_mode: string; active: boolean } }
      | undefined;
    if (!v || !v.active || !v.products?.active) return json(req, 422, { message: "Ein Artikel ist nicht mehr verfügbar." });
    if (v.products.sales_mode === "launch") return json(req, 422, { message: `${v.products.name} ist noch nicht bestellbar.` });
    if (v.price_cents == null || !v.net_weight_grams) return json(req, 422, { message: `Für ${v.products.name} ist noch kein Preis festgelegt.` });
    if (v.stock != null && v.stock < it.qty) return json(req, 409, { message: `Von ${v.products.name} sind nur noch ${v.stock} Stück verfügbar.` });
    kinds.add(v.products.sales_mode === "preorder" ? "preorder" : "order");
    lines.push({ variantId: v.id, name: `${v.products.name} – ${v.name}`, qty: it.qty, unit: v.price_cents, line: v.price_cents * it.qty });
  }
  if (kinds.size > 1) return json(req, 422, { message: "Bitte bestelle vorbestellbare und sofort lieferbare Artikel getrennt." });
  const kind = [...kinds][0] as "order" | "preorder";

  const country = (body.shippingAddress as Address | undefined)?.country ?? (typeof body.country === "string" ? body.country : "DE");
  const { data: method } = await db.from("shipping_methods").select("*").eq("id", String(body.shippingMethod ?? "")).eq("active", true).maybeSingle();
  if (!method || method.price_cents == null || !(method.countries as string[]).includes(country)) {
    return json(req, 422, { message: "Diese Versandart ist für das gewählte Land nicht verfügbar." });
  }

  const subtotal = lines.reduce((s, l) => s + l.line, 0);
  const shipping = method.free_from_cents != null && subtotal >= method.free_from_cents ? 0 : method.price_cents;

  // Gutschein prüfen
  let discount = 0;
  let couponCode: string | null = null;
  if (typeof body.coupon === "string" && body.coupon.trim()) {
    const now = new Date().toISOString();
    const { data: c } = await db.from("coupons").select("*").eq("code", body.coupon.trim().toUpperCase()).eq("active", true).maybeSingle();
    const valid =
      c &&
      (!c.valid_from || c.valid_from <= now) &&
      (!c.valid_until || c.valid_until >= now) &&
      (c.max_redemptions == null || c.redemptions < c.max_redemptions) &&
      (c.min_subtotal_cents == null || subtotal >= c.min_subtotal_cents);
    if (valid) {
      couponCode = c.code;
      discount = c.kind === "percent" ? Math.round((subtotal * Math.min(c.value, 100)) / 100) : Math.min(c.value, subtotal);
    }
  }
  const total = subtotal - discount + shipping;
  const quote = { subtotalCents: subtotal, shippingCents: shipping, discountCents: discount, totalCents: total, couponCode };

  if (body.action === "quote") return json(req, 200, { quote });
  if (body.action !== "create") return json(req, 400, { message: "Unbekannte Aktion." });

  // Bestellung anlegen
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) return json(req, 422, { message: "Bitte gib eine gültige E-Mail-Adresse ein." });
  if (!validAddress(body.shippingAddress) || !validAddress(body.billingAddress)) return json(req, 422, { message: "Bitte prüfe die Adressangaben." });
  if (body.acceptTerms !== true) return json(req, 422, { message: "Bitte bestätige AGB und Widerrufsbelehrung." });

  const user = await userFromRequest(req);
  const { data: order, error: oErr } = await db
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      email,
      kind,
      shipping_address: cleanAddress(body.shippingAddress as Address),
      billing_address: cleanAddress(body.billingAddress as Address),
      shipping_method: method.id,
      coupon_code: couponCode,
      subtotal_cents: subtotal,
      discount_cents: discount,
      shipping_cents: shipping,
      total_cents: total,
      terms_accepted_at: new Date().toISOString(),
    })
    .select("id, number")
    .single();
  if (oErr || !order) {
    console.error("[checkout] order", oErr);
    return json(req, 500, { message: "Die Bestellung konnte nicht angelegt werden. Es wurde nichts berechnet." });
  }
  await db.from("order_items").insert(lines.map((l) => ({ order_id: order.id, variant_id: l.variantId, name: l.name, qty: l.qty, unit_cents: l.unit, line_cents: l.line })));

  try {
    const site = env("SITE_URL")!.replace(/\/$/, "");
    const params: Record<string, string | number> = {
      mode: "payment",
      locale: "de",
      customer_email: email,
      client_reference_id: order.id,
      "metadata[order_id]": order.id,
      "metadata[order_number]": order.number,
      "payment_intent_data[metadata][order_id]": order.id,
      success_url: `${site}/kasse/bestaetigung/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/warenkorb/`,
      "shipping_options[0][shipping_rate_data][type]": "fixed_amount",
      "shipping_options[0][shipping_rate_data][display_name]": method.label,
      "shipping_options[0][shipping_rate_data][fixed_amount][amount]": shipping,
      "shipping_options[0][shipping_rate_data][fixed_amount][currency]": "eur",
    };
    lines.forEach((l, i) => {
      params[`line_items[${i}][quantity]`] = l.qty;
      params[`line_items[${i}][price_data][currency]`] = "eur";
      params[`line_items[${i}][price_data][unit_amount]`] = l.unit;
      params[`line_items[${i}][price_data][product_data][name]`] = l.name;
    });
    if (discount > 0) {
      const coupon = await stripe<{ id: string }>("coupons", { amount_off: discount, currency: "eur", duration: "once", name: couponCode ?? "Gutschein" });
      params["discounts[0][coupon]"] = coupon.id;
    }
    const session = await stripe<{ id: string; url: string }>("checkout/sessions", params);
    await db.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id);
    return json(req, 200, { url: session.url });
  } catch (e) {
    console.error("[checkout] stripe", e);
    await db.from("orders").update({ status: "cancelled" }).eq("id", order.id);
    return json(req, 502, { message: "Die Zahlungsseite konnte nicht geöffnet werden. Es wurde nichts berechnet." });
  }
});
