import type { Metadata } from "next";
import { Checkout } from "@/components/commerce/Checkout";

export const metadata: Metadata = { title: "Kasse", robots: { index: false } };

export default function Page() {
  return <Checkout />;
}
