// Production URL for canonicals, Open Graph, sitemap and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL to the real domain (pedrotortoriello.com was not
// registered on 2026-10-19). On Vercel the production URL is the fallback.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const raw = process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : undefined);

if (!raw && process.env.NODE_ENV === "production") {
  console.warn("[site] NEXT_PUBLIC_SITE_URL is not set: canonicals and Open Graph will point to http://localhost:3000.");
}

export const SITE_URL = (raw ?? "http://localhost:3000").replace(/\/$/, "");
