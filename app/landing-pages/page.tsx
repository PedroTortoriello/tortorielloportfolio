import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LpCard, NicheTabs, RouteHeader } from "@/components/landing-pages/showcase";
import { landingPages, niches, nichesByCount, pagesInNiche } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "Landing pages por nicho",
  description: `Índice de ${landingPages.length} landing pages e sites publicados, organizados por nicho: advocacia, eventos, imobiliário, arquitetura, software e mais.`,
  alternates: { canonical: "/landing-pages" },
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function LandingPagesIndex() {
  return (
    <>
      <RouteHeader trail={[{ label: "~", href: "/" }, { label: "landing-pages" }]}>
        <h1 className="enter display mt-10 max-w-[16ch] text-[clamp(2.6rem,6vw,5.2rem)] text-ink [--wdth:112]">
          Landing pages e sites publicados.
        </h1>
        <p className="enter mt-7 max-w-2xl text-pretty text-lg leading-8 text-ink-muted" style={d(120)}>
          Páginas de conversão com SEO técnico, formulários que entregam o lead e tracking com consentimento. Escolha um nicho para ver o que foi construído em cada uma.
        </p>
        <p className="enter hud mt-6 leading-5" style={d(200)}>
          {landingPages.length} páginas · {niches.length} nichos · links verificados em outubro de 2026
        </p>
        <div className="mt-12">
          <NicheTabs />
        </div>
      </RouteHeader>

      <section aria-label="Índice por nicho" className="section-y">
        <div className="container-x grid gap-20 lg:gap-28">
          {nichesByCount().map((n, i) => {
            const pages = pagesInNiche(n.slug);
            return (
              <div key={n.slug} className="grid grid-cols-1 gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:pt-10">
                <div data-reveal className="lg:sticky lg:top-24 lg:col-span-3 lg:self-start">
                  <h2 className="display text-[clamp(1.6rem,2.4vw,2rem)] text-ink [--wdth:104]">
                    <Link href={`/landing-pages/${n.slug}`} className="transition-colors hover:text-blue">
                      {n.name}
                    </Link>
                  </h2>
                  {/* index under the title, not above it as an eyebrow */}
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
                    <span className="tabular text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className="text-line-strong">
                      {"  —  "}
                    </span>
                    {pages.length} {pages.length === 1 ? "página" : "páginas"}
                  </p>
                  <p className="mt-3 text-pretty text-sm leading-6 text-ink-muted">{n.description}</p>
                  <Link
                    href={`/landing-pages/${n.slug}`}
                    className="group mt-3 inline-flex min-h-10 items-center gap-1.5 font-mono text-[0.75rem] text-blue transition-colors hover:text-blue-bright"
                  >
                    /landing-pages/{n.slug}
                    <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <ul data-stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {pages.map((p) => (
                    <li key={p.slug}>
                      <LpCard lp={p} flags sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
