import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 erzeugt eine rein statische Version (z. B. GitHub Pages).
 * Server-Logik läuft in jedem Fall über Supabase Edge Functions, daher
 * funktioniert der Shop statisch wie auf Vercel gleich.
 * BASE_PATH setzt den Unterpfad (z. B. "/Elora" für <user>.github.io/Elora).
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  ...(isStatic
    ? { output: "export" }
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
