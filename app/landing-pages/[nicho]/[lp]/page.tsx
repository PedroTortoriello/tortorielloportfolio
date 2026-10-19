import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LpShowcase, NicheTabs } from "@/components/landing-pages/showcase";
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
            <Link href={`/landing-pages/${niche.slug}`} className="transition-colors hover:text-ink">
              {niche.slug}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ink-muted" aria-current="page">
              {lp.slug}
            </span>
          </nav>
          <div className="mt-8">
            <NicheTabs current={niche.slug} exact={false} />
          </div>
        </div>
      </section>

      <section aria-labelledby={`${lp.slug}-title`} className="pb-20 pt-14 sm:pt-20">
        <div className="container-x">
          <LpShowcase lp={lp} as="h1" details={false} />
        </div>
      </section>

      {others.length ? (
        <section aria-labelledby="mais-title" className="border-t border-line-faint py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="mais-title" className="text-xl font-medium tracking-[-0.02em] text-ink">
                Mais em {niche.name.toLowerCase()}
              </h2>
              <Link href={`/landing-pages/${niche.slug}`} className="font-mono text-[0.72rem] text-blue">
                /landing-pages/{niche.slug} →
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/landing-pages/${p.niche}/${p.slug}`}
                    className="edge-light group block overflow-hidden rounded-xl border border-line bg-surface/70 transition-colors hover:border-line-strong"
                  >
                    <div className="overflow-hidden border-b border-line">
                      <Image
                        src={shot(p.slug, "desktop")}
                        alt=""
                        width={1440}
                        height={900}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate text-[0.95rem] font-medium text-ink">{p.name}</p>
                        <p className="mt-1 text-[0.75rem] text-ink-faint">
                          {p.kind}
                          {p.city ? ` · ${p.city}` : ""}
                        </p>
                      </div>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-blue" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

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
