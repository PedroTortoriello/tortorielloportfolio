import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LpCard, Line, NicheTabs, RouteHeader, headline, lines, pad } from "@/components/landing-pages/showcase";
import { profile } from "@/lib/data";
import { landingPages, niches, nichesByCount, pagesInNiche } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "Landing pages por nicho",
  description: `Índice de ${landingPages.length} landing pages e sites publicados, organizados por nicho: advocacia, eventos, imobiliário, arquitetura, software e mais.`,
  alternates: { canonical: "/landing-pages" },
  // a page-level openGraph replaces the layout's, so the image is restated here
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: profile.name,
    url: "/landing-pages",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pedro Tortoriello — Software Engineer · Full Stack & Automation",
      },
    ],
  },
};

export default function LandingPagesIndex() {
  return (
    <div lang="pt-BR">
      <RouteHeader
        trail={[{ label: "~", href: "/" }, { label: "landing-pages" }]}
        label="Índice"
        title={
          <h1 className={`${headline} ${lines} text-[clamp(2.25rem,5.2vw,4.75rem)]`}>
            <Line slash delay={80}>
              Landing pages{" "}
            </Line>
            <Line grey delay={170}>
              e sites publicados.
            </Line>
          </h1>
        }
        aside={
          <p className="text-pretty text-[0.9375rem] leading-7 text-ink-muted">
            Páginas de conversão com SEO técnico, formulários que entregam o lead e tracking com consentimento. Escolha um nicho para ver o
            que foi construído em cada uma.
          </p>
        }
      >
        <p className="t-label leading-5">
          {landingPages.length} páginas · {niches.length} nichos · links verificados entre outubro e novembro de 2026
        </p>
        <div className="mt-5">
          <NicheTabs />
        </div>
      </RouteHeader>

      {/* One band per niche, largest first: its name stays beside the cards while they scroll (lg). */}
      <div className="container-x grid gap-24 pb-32 pt-20 sm:pt-24 lg:gap-32 lg:pb-40 lg:pt-28">
        {nichesByCount().map((n, i) => {
          const pages = pagesInNiche(n.slug);
          return (
            <section
              key={n.slug}
              aria-labelledby={`nicho-${n.slug}`}
              className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12 lg:gap-x-6 lg:pt-8"
            >
              <div data-reveal className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-3 lg:self-start">
                <h2 id={`nicho-${n.slug}`} className={`${headline} text-[clamp(1.6rem,2.3vw,2.1rem)]`}>
                  <Link href={`/landing-pages/${n.slug}`} className="text-ink transition-colors duration-300 hover:text-accent">
                    {n.name}
                  </Link>
                </h2>
                <p className="t-label mt-4">
                  <span aria-hidden className="t-bracket tabular mr-2">
                    {pad(i + 1)}
                  </span>
                  {pages.length} {pages.length === 1 ? "página" : "páginas"}
                </p>
                <p className="mt-4 max-w-[40ch] text-pretty text-[0.875rem] leading-6 text-ink-muted">{n.description}</p>
                <Link
                  href={`/landing-pages/${n.slug}`}
                  className="group mt-2 inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.75rem] text-accent transition-colors duration-300 hover:text-ink"
                >
                  /landing-pages/{n.slug}
                  <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                {pages.map((p, j) => (
                  <li key={p.slug}>
                    <LpCard lp={p} n={j + 1} flags sizes="(min-width: 1024px) 340px, (min-width: 640px) 48vw, 92vw" />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
