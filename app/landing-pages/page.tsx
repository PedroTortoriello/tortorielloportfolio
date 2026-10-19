import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NicheTabs } from "@/components/landing-pages/showcase";
import { landingPages, niches, nichesByCount, pagesInNiche, shot } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "Landing pages por nicho",
  description: `Índice de ${landingPages.length} landing pages e sites publicados, organizados por nicho: advocacia, eventos, imobiliário, arquitetura, software e mais.`,
  alternates: { canonical: "/landing-pages" },
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function LandingPagesIndex() {
  return (
    <>
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
            <span className="text-ink-muted" aria-current="page">
              landing-pages
            </span>
          </nav>
          <h1 className="enter mt-8 max-w-4xl text-balance text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink">
            Landing pages e sites publicados.
          </h1>
          <p className="enter mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-muted" style={d(120)}>
            Páginas de conversão com SEO técnico, formulários que entregam o lead e tracking com consentimento. Escolha um nicho para ver o que foi construído em cada uma.
          </p>
          <p className="enter mt-6 text-[0.8rem] text-ink-faint" style={d(200)}>
            {landingPages.length} páginas · {niches.length} nichos · links verificados em outubro de 2026
          </p>
          <div className="mt-12">
            <NicheTabs />
          </div>
        </div>
      </section>

      <section aria-label="Índice por nicho" className="section-y">
        <div className="container-x grid gap-20">
          {nichesByCount().map((n) => {
            const pages = pagesInNiche(n.slug);
            return (
              <div key={n.slug} className="grid-cols-1 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3" data-reveal>
                  <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">
                    <Link href={`/landing-pages/${n.slug}`} className="transition-colors hover:text-blue">
                      {n.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{n.description}</p>
                  <Link href={`/landing-pages/${n.slug}`} className="mt-4 inline-block font-mono text-[0.7rem] text-blue">
                    /landing-pages/{n.slug} →
                  </Link>
                </div>
                <ul className="grid-cols-1 grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {pages.map((p, i) => (
                    <li key={p.slug} data-reveal style={d(i * 60)}>
                      <Link
                        href={`/landing-pages/${n.slug}/${p.slug}`}
                        className="edge-light group block overflow-hidden rounded-xl border border-line bg-surface/70 transition-colors hover:border-line-strong"
                      >
                        <div className="overflow-hidden border-b border-line">
                          <Image
                            src={shot(p.slug, "desktop")}
                            alt=""
                            width={1440}
                            height={900}
                            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="flex items-start justify-between gap-3 p-4">
                          <div className="min-w-0">
                            <p className="truncate text-[0.95rem] font-medium text-ink">
                              {p.name}
                              {p.featured ? <span className="ml-2 align-[1px] text-[0.68rem] font-normal text-blue">destaque</span> : null}
                            </p>
                            <p className="mt-1 text-[0.75rem] text-ink-faint">
                              {p.kind}
                              {p.city ? ` · ${p.city}` : ""}
                              {p.preview ? " · em aprovação" : ""}
                            </p>
                          </div>
                          <ArrowUpRight aria-hidden className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-blue" />
                        </div>
                      </Link>
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
