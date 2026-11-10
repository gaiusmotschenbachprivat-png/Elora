import type { Metadata, Viewport } from "next";
import { Jost, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ELORA DAY – Dein Morgen, natürlich unterstützt.",
    template: "%s · ELORA",
  },
  description: site.description,
  applicationName: "ELORA",
  keywords: [
    "ELORA",
    "ELORA DAY",
    "Elektrolyte",
    "Getränkepulver",
    "Morgenroutine",
    "Vitamin C",
    "Magnesium",
    "Kalium",
    "ohne Koffein",
    "Natural Daily Nutrition",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "ELORA",
    title: "ELORA DAY – Dein Morgen, natürlich unterstützt.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ELORA DAY – Dein Morgen, natürlich unterstützt.",
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${jost.variable} ${manrope.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal,.animate-fade-up{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
