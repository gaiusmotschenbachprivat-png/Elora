import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { ShopProvider } from "@/components/providers/ShopProvider";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: { default: "ELORA – The Art of Daily Balance", template: "%s · ELORA" },
  description: site.description,
  applicationName: "ELORA",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ELORA",
    title: "ELORA – The Art of Daily Balance.",
    description: site.description,
    images: [{ url: "images/hero-1920.webp", width: 1920, height: 960, alt: "ELORA DAY – concept visualisation" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Motion only with JavaScript – without JS all content is visible immediately */}
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
