import type { Metadata } from "next";
import { CartView } from "@/components/commerce/CartView";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function Page() {
  return <CartView />;
}
