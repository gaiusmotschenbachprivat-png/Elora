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
          setView({ kind: "error", message: data.message ?? "We could not find this order." });
          return;
        }
        setView({ kind: "order", order: data.order });
        if (data.order.status === "paid") clear();
        // Zahlungsbestätigung (Webhook) kann einige Sekunden dauern
        if (data.order.status === "pending_payment" && tries++ < 8) timer = window.setTimeout(load, 2500);
      } catch {
        setView({ kind: "error", message: "No connection. Please reload the page." });
      }
    };
    load();
    return () => window.clearTimeout(timer);
  }, [sessionId, clear]);

  return (
    <div className="frame pt-36 pb-28 lg:pt-44">
      {view.kind === "order" && view.order.status === "paid" ? (
        <>
          <p className="spec text-citrus-700">Order {view.order.number}</p>
          <h1 className="mt-6 font-display text-display">
            Thank you. <em className="display-italic">{view.order.kind === "preorder" ? "Pre-ordered." : "Ordered."}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lede text-ink-soft">
            Your payment has been received. A confirmation is on its way to {view.order.email}.
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
              <span>Total</span>
              <span className="font-mono">{formatPrice(view.order.totalCents)}</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-6">
            <LinkButton href="/konto/" arrow>
              Go to account
            </LinkButton>
            <Link href="/" className="self-center link-line">
              Back to home
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-display text-title">Order status</h1>
          <div className="mt-10 max-w-xl">
            {view.kind === "loading" && <p className="text-ink-soft">Loading order …</p>}
            {view.kind === "order" && view.order.status === "pending_payment" && (
              <Notice title="Confirming payment">We are waiting for confirmation from the payment provider. This page updates automatically.</Notice>
            )}
            {view.kind === "order" && view.order.status === "cancelled" && (
              <Notice tone="error" title="Order not completed">The payment was not completed. You have not been charged.</Notice>
            )}
            {view.kind === "missing" && <Notice>No order was provided.</Notice>}
            {view.kind === "inactive" && <Notice tone="inactive">Order processing is not activated yet.</Notice>}
            {view.kind === "error" && <Notice tone="error">{view.message}</Notice>}
          </div>
        </>
      )}
    </div>
  );
}
