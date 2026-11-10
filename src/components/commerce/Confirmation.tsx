"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { LinkButton } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { formatPrice } from "@/lib/commerce";
import { callFunction, services } from "@/lib/services";

type Order = {
  number: string;
  status: "pending_payment" | "paid" | "cancelled" | "fulfilled";
  kind: "order" | "preorder";
  totalCents: number;
  email: string;
  items: { name: string; qty: number; lineCents: number }[];
};

type View = { kind: "loading" } | { kind: "missing" } | { kind: "inactive" } | { kind: "error"; message: string } | { kind: "order"; order: Order };

export function Confirmation() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clear } = useShop();
  const [view, setView] = useState<View>(() => (!sessionId ? { kind: "missing" } : !services.supabase ? { kind: "inactive" } : { kind: "loading" }));

  useEffect(() => {
    if (!sessionId || !services.supabase) return;
    let tries = 0;
    let timer: number;
    const load = async () => {
      try {
        const { ok, data } = await callFunction<{ order?: Order; message?: string }>("order-status", { sessionId });
        if (!ok || !data.order) {
          setView({ kind: "error", message: data.message ?? "Wir konnten die Bestellung nicht finden." });
          return;
        }
        setView({ kind: "order", order: data.order });
        if (data.order.status === "paid") clear();
        // Zahlungsbestätigung (Webhook) kann einige Sekunden dauern
        if (data.order.status === "pending_payment" && tries++ < 8) timer = window.setTimeout(load, 2500);
      } catch {
        setView({ kind: "error", message: "Keine Verbindung. Bitte lade die Seite neu." });
      }
    };
    load();
    return () => window.clearTimeout(timer);
  }, [sessionId, clear]);

  return (
    <div className="frame pt-36 pb-28 lg:pt-44">
      {view.kind === "order" && view.order.status === "paid" ? (
        <>
          <p className="spec text-citrus-700">Bestellung {view.order.number}</p>
          <h1 className="mt-6 font-display text-display">
            Danke. <em className="display-italic">{view.order.kind === "preorder" ? "Vorbestellt." : "Bestellt."}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lede text-ink-soft">
            Deine Zahlung ist eingegangen. Eine Bestätigung ist unterwegs an {view.order.email}.
          </p>
          <ul className="mt-12 max-w-xl divide-y divide-line border-y border-ink/80">
            {view.order.items.map((i) => (
              <li key={i.name} className="flex justify-between py-4">
                <span>
                  {i.qty} × {i.name}
                </span>
                <span className="font-mono">{formatPrice(i.lineCents)}</span>
              </li>
            ))}
            <li className="flex justify-between py-4 text-[1.05rem]">
              <span>Gesamt</span>
              <span className="font-mono">{formatPrice(view.order.totalCents)}</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-6">
            <LinkButton href="/konto/" arrow>
              Zum Kundenkonto
            </LinkButton>
            <Link href="/" className="self-center link-line">
              Zur Startseite
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-display text-title">Bestellstatus</h1>
          <div className="mt-10 max-w-xl">
            {view.kind === "loading" && <p className="text-ink-soft">Bestellung wird geladen …</p>}
            {view.kind === "order" && view.order.status === "pending_payment" && (
              <Notice title="Zahlung wird bestätigt">Wir warten auf die Bestätigung des Zahlungsdienstleisters. Diese Seite aktualisiert sich automatisch.</Notice>
            )}
            {view.kind === "order" && view.order.status === "cancelled" && (
              <Notice tone="error" title="Bestellung nicht abgeschlossen">Die Zahlung wurde nicht abgeschlossen. Es wurde nichts berechnet.</Notice>
            )}
            {view.kind === "missing" && <Notice>Es wurde keine Bestellung übergeben.</Notice>}
            {view.kind === "inactive" && <Notice tone="inactive">Die Bestellabwicklung ist noch nicht aktiviert.</Notice>}
            {view.kind === "error" && <Notice tone="error">{view.message}</Notice>}
          </div>
        </>
      )}
    </div>
  );
}
