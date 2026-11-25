import type { MetadataRoute } from "next";
import { landingPages, niches } from "@/lib/landing-pages";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/landing-pages`, changeFrequency: "monthly", priority: 0.6 },
    ...niches.map((n) => ({ url: `${SITE_URL}/landing-pages/${n.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...landingPages.map((p) => ({ url: `${SITE_URL}/landing-pages/${p.niche}/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
