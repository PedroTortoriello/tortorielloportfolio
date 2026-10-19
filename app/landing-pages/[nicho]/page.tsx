import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LpContactCta, LpShowcase, NicheTabs, RouteHeader } from "@/components/landing-pages/showcase";
import { profile } from "@/lib/data";
import { nicheBySlug, niches, pagesInNiche, shot } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ nicho: string }> };

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export const dynamicParams = false;

export function generateStaticParams() {
  return niches.map((n) => ({ nicho: n.slug }));
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RouteHeader trail={[{ label: "~", href: "/" }, { label: "landing-pages", href: "/landing-pages" }, { label: niche.slug }]}>
        <h1 className="enter display mt-10 max-w-[20ch] text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink [--wdth:110]">{niche.title}</h1>
        <p className="enter mt-7 max-w-2xl text-pretty text-lg leading-8 text-ink-muted" style={d(120)}>
          {niche.description}
        </p>
        <p className="enter hud mt-6 leading-5" style={d(200)}>
          {pages.length} {pages.length === 1 ? "página publicada" : "páginas publicadas"}
          {cities.length ? ` · ${cities.join(" · ")}` : ""}
        </p>
        <div className="mt-12">
          <NicheTabs current={niche.slug} />
        </div>
      </RouteHeader>

      <section aria-label={`Projetos de ${niche.name}`} className="section-y">
        <div className="container-x grid gap-24 lg:gap-32">
          {pages.map((lp, i) => (
            <LpShowcase key={lp.slug} lp={lp} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <LpContactCta niche={niche} />
    </>
  );
}
