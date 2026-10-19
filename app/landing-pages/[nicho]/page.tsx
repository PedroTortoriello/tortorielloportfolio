import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LpShowcase, NicheTabs } from "@/components/landing-pages/showcase";
import { profile } from "@/lib/data";
import { nicheBySlug, niches, pagesInNiche, shot } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ nicho: string }> };

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
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_0%,rgb(67_136_255/0.14),transparent_62%)]" />
          <div className="tech-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_0%,black,transparent_75%)]" />
        </div>
        <div className="container-x">
          <nav aria-label="Trilha" className="font-mono text-[0.72rem] text-ink-faint">
            <Link href="/" className="transition-colors hover:text-ink">
              ~
            </Link>
            <span aria-hidden> / </span>
            <Link href="/landing-pages" className="transition-colors hover:text-ink">
              landing-pages
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ink-muted" aria-current="page">
              {niche.slug}
            </span>
          </nav>
          <h1 className="enter mt-8 max-w-4xl text-balance text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink">
            {niche.title}
          </h1>
          <p className="enter mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
            {niche.description}
          </p>
          <p className="enter mt-6 text-[0.8rem] text-ink-faint" style={{ "--d": "200ms" } as React.CSSProperties}>
            {pages.length} {pages.length === 1 ? "página publicada" : "páginas publicadas"}
            {cities.length ? ` · ${cities.join(" · ")}` : ""}
          </p>
          <div className="mt-12">
            <NicheTabs current={niche.slug} />
          </div>
        </div>
      </section>

      <section aria-label={`Projetos de ${niche.name}`} className="section-y">
        <div className="container-x grid gap-24 lg:gap-32">
          {pages.map((lp, i) => (
            <LpShowcase key={lp.slug} lp={lp} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="border-t border-line-faint py-20">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-balance text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-[-0.035em] text-ink">
            Precisa de uma landing page para {niche.name.toLowerCase()}?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Landing page · ${niche.name}`)}`}
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-blue-fill px-5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_0_0_1px_rgb(67_136_255/0.6)]"
            >
              Falar por e-mail
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/#projetos"
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line-strong px-5 text-sm text-ink transition-colors hover:border-blue/60"
            >
              Ver cases de engenharia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
