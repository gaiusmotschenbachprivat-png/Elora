import type { Metadata } from "next";
import { CartView } from "@/components/commerce/CartView";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false } };

export default function Page() {
  return <CartView />;
}
