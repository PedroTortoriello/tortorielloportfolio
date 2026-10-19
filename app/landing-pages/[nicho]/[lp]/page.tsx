import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LpCard, LpContactCta, LpShowcase, NicheTabs, RouteHeader } from "@/components/landing-pages/showcase";
import { profile } from "@/lib/data";
import { landingPages, nicheBySlug, pageBySlug, pagesInNiche, shot } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ nicho: string; lp: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((p) => ({ nicho: p.niche, lp: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nicho, lp: slug } = await params;
  const lp = pageBySlug(nicho, slug);
  const niche = nicheBySlug(nicho);
  if (!lp || !niche) return {};
  const path = `/landing-pages/${nicho}/${slug}`;
  const description = lp.note ? `${lp.summary} ${lp.note}` : lp.summary;
  return {
    title: `${lp.name} · ${lp.kind}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: profile.name,
      title: `${lp.name} · ${lp.kind} | ${profile.name}`,
      description,
      url: `${SITE_URL}${path}`,
      images: [{ url: shot(lp.slug, "desktop"), width: 1440, height: 900 }],
    },
  };
}

export default async function LandingPageDetail({ params }: Props) {
  const { nicho, lp: slug } = await params;
  const lp = pageBySlug(nicho, slug);
  const niche = nicheBySlug(nicho);
  if (!lp || !niche) notFound();
  const others = pagesInNiche(nicho).filter((p) => p.slug !== lp.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: lp.name,
    url: lp.url,
    genre: niche.name,
    description: lp.note ? `${lp.summary} ${lp.note}` : lp.summary,
    // Shared work is credited as a contribution, never as sole authorship.
    [lp.shared ? "contributor" : "creator"]: { "@type": "Person", name: profile.name, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RouteHeader
        trail={[
          { label: "~", href: "/" },
          { label: "landing-pages", href: "/landing-pages" },
          { label: niche.slug, href: `/landing-pages/${niche.slug}` },
          { label: lp.slug },
        ]}
      >
        <div className="mt-8">
          <NicheTabs current={niche.slug} exact={false} />
        </div>
      </RouteHeader>

      <section aria-labelledby={`${lp.slug}-title`} className="pb-20 pt-14 sm:pt-20">
        <div className="container-x">
          <LpShowcase lp={lp} as="h1" details={false} />
        </div>
      </section>

      {others.length ? (
        <section aria-labelledby="mais-title" className="border-t border-line-faint py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <h2 id="mais-title" className="display text-[clamp(1.6rem,2.6vw,2.2rem)] text-ink [--wdth:104]">
                Mais em {niche.name.toLowerCase()}
              </h2>
              <Link
                href={`/landing-pages/${niche.slug}`}
                className="group inline-flex min-h-10 items-center gap-1.5 font-mono text-[0.75rem] text-blue transition-colors hover:text-blue-bright"
              >
                /landing-pages/{niche.slug}
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul data-stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <LpCard lp={p} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <LpContactCta niche={niche} />
    </>
  );
}
