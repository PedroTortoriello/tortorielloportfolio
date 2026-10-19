import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { landingPages, niches, nichesByCount, pagesInNiche, shot } from "@/lib/landing-pages";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Hovering a niche fans its stack of real screenshots apart.
const fan = ["group-hover:-translate-x-3 group-hover:-translate-y-2", "", "group-hover:translate-x-3 group-hover:translate-y-2"];

// Largest niche gets the 2x2 tile, the next one a wide tile, then five small
// ones; anything beyond that is listed in the index tile (a full 4x3 grid).
const SHOWN = 7;

export function LandingPagesTeaser() {
  const ranked = nichesByCount();
  const shown = ranked.slice(0, SHOWN);
  const rest = ranked.slice(SHOWN);
  return (
    <section id="landing-pages" aria-labelledby="lps-title" className="section-y relative border-t border-line-faint">
      <div className="container-x">
        <SectionHeader
          id="lps-title"
          index="05"
          label="Landing pages"
          meta={`${landingPages.length} páginas · ${niches.length} nichos`}
          statement="Landing pages e sites publicados, organizados por nicho."
          lead="Além de sistemas, construo páginas de conversão: SEO técnico, tracking com consentimento e formulários que entregam o lead. Cada nicho tem a sua página."
        />

        <ul className="grid-cols-1 mt-16 grid auto-rows-[minmax(15rem,auto)] gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {shown.map((n, i) => {
            const pages = pagesInNiche(n.slug);
            const big = i === 0;
            const wide = i === 1;
            return (
              <li key={n.slug} data-reveal style={d(i * 60)} className={big ? "lg:col-span-2 lg:row-span-2" : wide ? "lg:col-span-2" : ""}>
                <Link
                  href={`/landing-pages/${n.slug}`}
                  className="edge-light group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors duration-300 hover:border-line-strong"
                >
                  <div className={`relative overflow-hidden border-b border-line bg-bg ${big ? "aspect-[16/11] lg:aspect-auto lg:flex-1" : "aspect-[16/9]"}`}>
                    {pages.slice(0, 3).map((p, k) => (
                      <div
                        key={p.slug}
                        className={`absolute overflow-hidden rounded-md border border-line-strong shadow-[0_20px_40px_-16px_rgb(0_0_0/0.9)] transition-transform duration-700 ease-out ${fan[k]}`}
                        style={{ width: "78%", left: `${6 + k * 8}%`, top: `${10 + k * 12}%`, zIndex: k + 1 }}
                      >
                        <Image
                          src={shot(p.slug, "desktop")}
                          alt=""
                          width={1440}
                          height={900}
                          sizes={big ? "(min-width: 1024px) 560px, 90vw" : "(min-width: 1024px) 280px, 90vw"}
                          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-medium leading-snug tracking-[-0.02em] text-ink">{n.name}</h3>
                      <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                    </div>
                    {big || wide ? (
                      <p className="mt-1 truncate font-mono text-[0.66rem] text-ink-faint">
                        /landing-pages/<span className="text-ink-muted">{n.slug}</span>
                      </p>
                    ) : null}
                    {big ? <p className="mt-2 max-w-md text-pretty text-sm leading-6 text-ink-muted">{n.description}</p> : null}
                    <p className="mt-2 text-[0.78rem] leading-5 text-ink-faint">
                      <span className="text-ink-muted">{pages.slice(0, big ? 4 : 2).map((p) => p.name).join(" · ")}</span>
                      {pages.length > (big ? 4 : 2) ? ` + ${pages.length - (big ? 4 : 2)}` : ""}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
          <li data-reveal style={d(SHOWN * 60)} className="flex flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6">
            <p className="font-mono text-[0.66rem] text-ink-faint">/landing-pages</p>
            <div>
              <p className="text-lg font-medium text-ink">Todas as landing pages</p>
              {rest.length ? (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Outros nichos">
                  {rest.map((n) => (
                    <li key={n.slug}>
                      <Link
                        href={`/landing-pages/${n.slug}`}
                        className="block rounded-md border border-line px-2 py-1 text-[0.75rem] text-ink-muted transition-colors hover:border-blue/60 hover:text-ink"
                      >
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-6 text-ink-muted">Índice completo, com o que foi construído em cada uma.</p>
              )}
              <Link href="/landing-pages" className="group mt-5 inline-flex items-center gap-2 text-sm text-blue">
                Abrir índice
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
