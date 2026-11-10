import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountPage } from "@/components/account/AccountPage";

export const metadata: Metadata = { title: "Kundenkonto", robots: { index: false } };

export default function Page() {
  return (
    <Suspense fallback={<div className="frame min-h-[60vh] pt-44" />}>
      <AccountPage />
    </Suspense>
  );
}
