import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Line,
  LpCard,
  LpContactCta,
  LpFacts,
  LpMedia,
  LpTags,
  NicheTabs,
  RouteHeader,
  d,
  headline,
  lines,
  pad,
} from "@/components/landing-pages/showcase";
import { Button } from "@/components/ui/button";
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
  // Numbers follow the niche page's order, so a page keeps its number everywhere.
  const all = pagesInNiche(nicho);
  const others = all.length - 1;
  const visit = lp.preview ? "Ver prévia" : "Visitar site";
  const visitLabel = `${visit} de ${lp.name} (abre em nova aba)`;
  // ponytail: two sizes by name length; long names ("Sistema Exato · Substituição Tributária") step down.
  const titleCls = `${headline} ${lines} ${lp.name.length > 24 ? "text-[clamp(1.9rem,3.4vw,3.1rem)]" : "text-[clamp(2.2rem,4.6vw,4.25rem)]"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: lp.name,
    url: lp.url,
    genre: niche.name,
    description: lp.note ? `${lp.summary} ${lp.note}` : lp.summary,
    // Shared work is credited as a contribution, never as sole authorship.
    [lp.shared ? "contributor" : "creator"]: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
  };

  return (
    <div lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RouteHeader
        trail={[
          { label: "~", href: "/" },
          { label: "landing-pages", href: "/landing-pages" },
          { label: niche.slug, href: `/landing-pages/${niche.slug}` },
          { label: lp.slug },
        ]}
        label={`Projeto ${pad(all.findIndex((p) => p.slug === lp.slug) + 1, 3)}`}
        title={
          <>
            <h1 className={titleCls}>
              <Line slash delay={80}>
                {lp.name}
              </Line>
            </h1>
            <p className={titleCls}>
              <Line grey delay={170}>
                {niche.name}
              </Line>
            </p>
          </>
        }
        aside={
          <>
            <p className="text-pretty text-[0.9375rem] leading-7 text-ink-muted">{lp.summary}</p>
            <Button href={lp.url} external arrow="out" className="mt-7" ariaLabel={visitLabel}>
              {visit}
            </Button>
          </>
        }
      >
        <LpTags lp={lp} />
        <div className="mt-5">
          <NicheTabs current={niche.slug} exact={false} />
        </div>
      </RouteHeader>

      <section aria-labelledby={`${lp.slug}-construido`} className="container-x pt-16 sm:pt-20 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <LpMedia
            lp={lp}
            wide
            sizes="(min-width: 1440px) 820px, (min-width: 1280px) 56vw, (min-width: 1024px) 48vw, 88vw"
            className="lg:col-span-7 xl:col-span-8"
          />
          <div data-reveal style={d(120)} className="lg:col-span-5 xl:col-span-4 [&>:first-child]:mt-0">
            <LpFacts lp={lp} as="h2" />
            <Button href={lp.url} external variant="secondary" arrow="out" className="mt-8" ariaLabel={visitLabel}>
              {visit}
            </Button>
          </div>
        </div>
      </section>

      {others ? (
        <section aria-labelledby="mais-title" className="container-x pt-28 lg:pt-40">
          <div className="grid grid-cols-1 gap-y-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-x-6 lg:pt-8">
            <p aria-hidden className="t-label hidden pt-[0.45em] lg:col-span-2 lg:block">
              <span className="t-bracket">
                {others} {others === 1 ? "página" : "páginas"}
              </span>
            </p>
            <h2 id="mais-title" data-reveal className={`${headline} text-[clamp(1.9rem,3.6vw,3.25rem)] lg:col-span-10 xl:col-span-7`}>
              <span className="block text-ink">
                <span aria-hidden>{"//"}</span>Mais em{" "}
              </span>
              <span className="block text-ink-faint">{niche.name.toLowerCase()}</span>
            </h2>
          </div>
          <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {all.map((p, i) =>
              p.slug === lp.slug ? null : (
                <li key={p.slug}>
                  <LpCard lp={p} n={i + 1} sizes="(min-width: 1440px) 440px, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 92vw" />
                </li>
              ),
            )}
          </ul>
          {/* the work reference's closing plate: one lime action under the grid */}
          <div className="mt-10 flex justify-end">
            <Button href={`/landing-pages/${niche.slug}`} arrow="right" ariaLabel={`Ver todas as páginas de ${niche.name}`}>
              Ver todas as páginas
            </Button>
          </div>
        </section>
      ) : null}

      <LpContactCta niche={niche} />
    </div>
  );
}
