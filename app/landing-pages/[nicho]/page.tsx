import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Line, LpContactCta, LpShowcase, NicheTabs, RouteHeader, headline, lines, pad } from "@/components/landing-pages/showcase";
import { profile } from "@/lib/data";
import { nicheBySlug, niches, nichesByCount, pagesInNiche, shot } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ nicho: string }> };

export const dynamicParams = false;

// advocacia has its own route (app/landing-pages/advocacia), which wins over this template.
export function generateStaticParams() {
  return niches.filter((n) => n.slug !== "advocacia").map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nicho } = await params;
  const niche = nicheBySlug(nicho);
  if (!niche) return {};
  const pages = pagesInNiche(nicho);
  return {
    title: niche.title,
    description: `${niche.description} ${pages.length} ${pages.length === 1 ? "página publicada" : "páginas publicadas"} por ${profile.name}.`,
    alternates: { canonical: `/landing-pages/${nicho}` },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: profile.name,
      title: `${niche.title} | ${profile.name}`,
      description: niche.description,
      url: `${SITE_URL}/landing-pages/${nicho}`,
      images: pages[0] ? [{ url: shot(pages[0].slug, "desktop"), width: 1440, height: 900 }] : undefined,
    },
  };
}

export default async function NichePage({ params }: Props) {
  const { nicho } = await params;
  const niche = nicheBySlug(nicho);
  if (!niche) notFound();
  const pages = pagesInNiche(nicho);
  const cities = [...new Set(pages.map((p) => p.city).filter(Boolean))];
  const order = nichesByCount();
  // Two tones, as in the work reference: "Sites e landing pages" in ink, "para eventos…" in grey.
  const cut = niche.title.indexOf(" para ");
  const [first, rest] = cut > 0 ? [niche.title.slice(0, cut), niche.title.slice(cut + 1)] : [niche.title, ""];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: niche.title,
    url: `${SITE_URL}/landing-pages/${nicho}`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: p.url })),
    },
  };

  return (
    <div lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RouteHeader
        trail={[{ label: "~", href: "/" }, { label: "landing-pages", href: "/landing-pages" }, { label: niche.slug }]}
        label={`Nicho ${pad(order.findIndex((n) => n.slug === nicho) + 1)} / ${pad(order.length)}`}
        title={
          <h1 className={`${headline} ${lines} text-[clamp(2.1rem,4vw,3.75rem)]`}>
            <Line slash delay={80}>
              {first}{" "}
            </Line>
            {rest ? (
              <Line grey delay={170}>
                {rest}
              </Line>
            ) : null}
          </h1>
        }
        aside={<p className="text-pretty text-[0.9375rem] leading-7 text-ink-muted">{niche.description}</p>}
      >
        <p className="t-label leading-5">
          {pages.length} {pages.length === 1 ? "página publicada" : "páginas publicadas"}
          {cities.length ? ` · ${cities.join(" · ")}` : ""}
        </p>
        <div className="mt-5">
          <NicheTabs current={niche.slug} />
        </div>
      </RouteHeader>

      <section aria-label={`Projetos de ${niche.name}`} className="container-x grid gap-28 pt-20 sm:pt-24 lg:gap-40 lg:pt-28">
        {pages.map((lp, i) => (
          <LpShowcase key={lp.slug} lp={lp} n={i + 1} flip={i % 2 === 1} />
        ))}
      </section>

      <LpContactCta niche={niche} />
    </div>
  );
}
