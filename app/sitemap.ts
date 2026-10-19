import type { MetadataRoute } from "next";
import { landingPages, niches } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/landing-pages`, changeFrequency: "monthly", priority: 0.7 },
    ...niches.map((n) => ({ url: `${SITE_URL}/landing-pages/${n.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...landingPages.map((p) => ({ url: `${SITE_URL}/landing-pages/${p.niche}/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
