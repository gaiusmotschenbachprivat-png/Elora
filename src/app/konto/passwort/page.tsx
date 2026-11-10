import type { Metadata } from "next";
import { PasswordReset } from "@/components/account/PasswordReset";

export const metadata: Metadata = { title: "Passwort zurücksetzen", robots: { index: false } };

export default function Page() {
  return <PasswordReset />;
}
