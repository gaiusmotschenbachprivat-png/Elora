import type { Metadata } from "next";
import { PasswordReset } from "@/components/account/PasswordReset";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

export default function Page() {
  return <PasswordReset />;
}
