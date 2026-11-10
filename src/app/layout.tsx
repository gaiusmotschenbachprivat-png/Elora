import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { ShopProvider } from "@/components/providers/ShopProvider";
import { site } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-bodoni",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-hanken", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: { default: "ELORA – Natural Daily Nutrition", template: "%s · ELORA" },
  description: site.description,
  applicationName: "ELORA",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "ELORA",
    title: "ELORA – Dein Morgen. Natürlich unterstützt.",
    description: site.description,
    images: [{ url: "images/hero-1920.webp", width: 1920, height: 960, alt: "ELORA DAY – Konzeptvisualisierung" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bodoni.variable} ${hanken.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Bewegungen nur mit JavaScript – ohne JS sind alle Inhalte sofort sichtbar */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen">
        <ShopProvider>
          <Header />
          <main id="inhalt">{children}</main>
          <Footer />
          <CartDrawer />
        </ShopProvider>
      </body>
    </html>
  );
}
