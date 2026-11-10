import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 erzeugt eine rein statische Version (z. B. für GitHub Pages).
 * Dabei entfällt die API-Route; das Vormerk-Formular zeigt dann einen Hinweis,
 * dass die Liste noch eingerichtet wird. BASE_PATH setzt den Unterpfad
 * (z. B. "/Elora" für https://<user>.github.io/Elora).
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || undefined;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "0" },
  ...(isStatic
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
