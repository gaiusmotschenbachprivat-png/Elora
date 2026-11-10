import type { Metadata } from "next";
import { Suspense } from "react";
import { Confirmation } from "@/components/commerce/Confirmation";

export const metadata: Metadata = { title: "Bestellbestätigung", robots: { index: false } };

export default function Page() {
  return (
    <Suspense fallback={<div className="frame min-h-[60vh] pt-44" />}>
      <Confirmation />
    </Suspense>
  );
}
