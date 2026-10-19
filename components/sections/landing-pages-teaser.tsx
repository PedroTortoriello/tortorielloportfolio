import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { landingPages, niches, nichesByCount, pagesInNiche, shot } from "@/lib/landing-pages";

// Hovering a niche fans its stack of real screenshots apart.
const fan = ["group-hover:-translate-x-3 group-hover:-translate-y-2", "", "group-hover:translate-x-3 group-hover:translate-y-2"];

// Largest niche gets the 2x2 tile, the next one a wide tile, then five small
// ones; anything beyond that is listed in the index tile (a full 4x3 grid).
const SHOWN = 7;

const count = (n: number) => `${String(n).padStart(2, "0")} ${n === 1 ? "página" : "páginas"}`;

// Station 06: a bento of consoles, one per niche, each holding a stack of the
// real captures it links to. The route is the console's label.
export function LandingPagesTeaser() {
  const ranked = nichesByCount();
  const shown = ranked.slice(0, SHOWN);
  const rest = ranked.slice(SHOWN);
  return (
    <section
      id="landing-pages"
      data-station="06"
      data-station-label="LPs"
      aria-labelledby="landing-pages-title"
      className="section-y relative border-t border-line-faint"
    >
      <div className="container-x">
        <SectionHeader
          id="landing-pages-title"
          index="06"
          label="LPs"
          meta={`${landingPages.length} páginas · ${niches.length} nichos`}
          statement="Landing pages e sites publicados, organizados por nicho."
          lead="Além de sistemas, construo páginas de conversão: SEO técnico, tracking com consentimento e formulários que entregam o lead. Cada nicho tem a sua página."
        />

        <ul data-stagger className="mt-16 grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {shown.map((n, i) => {
            const pages = pagesInNiche(n.slug);
            const big = i === 0;
            const wide = i === 1;
            const named = big ? 4 : 2;
            return (
              <li key={n.slug} className={big ? "lg:col-span-2 lg:row-span-2" : wide ? "lg:col-span-2" : ""}>
                <Link href={`/landing-pages/${n.slug}`} className="group block h-full rounded-[6px]">
                  <div className="console ticks edge-light flex h-full flex-col transition-colors duration-300 group-hover:border-line-strong">
                    <div className="console-head">
                      <span className="hud min-w-0 truncate normal-case tracking-[0.06em]">
                        /landing-pages/<span className="text-ink-muted">{n.slug}</span>
                      </span>
                      <span className="hud ml-auto shrink-0 tabular">{count(pages.length)}</span>
                    </div>

                    {/* small tiles share the last row with the index tile, which can run taller: their well takes the slack */}
                    <div
                      className={`relative isolate overflow-hidden bg-bg ${
                        big
                          ? "aspect-[16/11] lg:aspect-auto lg:min-h-[22rem] lg:flex-1"
                          : wide
                            ? "aspect-[16/9]"
                            : "aspect-[16/9] lg:aspect-auto lg:min-h-[10rem] lg:flex-1"
                      }`}
                    >
                      <div aria-hidden className="drafting-grid absolute inset-0 opacity-60" />
                      {pages.slice(0, 3).map((p, k) => (
                        <div
                          key={p.slug}
                          className={`absolute overflow-hidden rounded-[4px] border border-line-strong shadow-[0_20px_40px_-16px_rgb(0_0_0/0.9)] transition-transform duration-700 ease-out ${fan[k]}`}
                          style={{ width: "78%", left: `${6 + k * 8}%`, top: `${10 + k * 12}%`, zIndex: k + 1 }}
                        >
                          <Image
                            src={shot(p.slug, "desktop")}
                            alt=""
                            width={1440}
                            height={900}
                            sizes={big ? "(min-width: 1024px) 560px, 90vw" : "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"}
                            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          />
                        </div>
                      ))}
                      <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-bg to-transparent" />
                    </div>

                    <div className="border-t border-line p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={
                            big
                              ? "display text-[clamp(1.6rem,2.4vw,2.1rem)] text-ink [--wdth:104]"
                              : "text-lg font-medium leading-snug tracking-[-0.02em] text-ink"
                          }
                        >
                          {n.name}
                        </h3>
                        <ArrowRight
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-blue"
                        />
                      </div>
                      {big ? <p className="mt-3 max-w-md text-pretty text-sm leading-6 text-ink-muted">{n.description}</p> : null}
                      <p className="mt-2 text-[0.8125rem] leading-5 text-ink-faint">
                        <span className="text-ink-muted">
                          {pages
                            .slice(0, named)
                            .map((p) => p.name)
                            .join(" · ")}
                        </span>
                        {pages.length > named ? ` + ${pages.length - named}` : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}

          <li>
            <div className="console ticks flex h-full flex-col">
              <div className="console-head">
                <span className="hud normal-case tracking-[0.06em]">/landing-pages</span>
                <span className="hud ml-auto shrink-0">índice</span>
              </div>
              <div className="drafting-grid flex flex-1 flex-col justify-between gap-6 p-5">
                <h3 className="text-lg font-medium leading-snug tracking-[-0.02em] text-ink">Todas as landing pages</h3>
                {rest.length ? (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Outros nichos">
                    {rest.map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={`/landing-pages/${n.slug}`}
                          className="inline-flex min-h-10 items-center rounded-[5px] border border-line bg-bg/70 px-2.5 text-[0.8125rem] text-ink-muted transition-colors hover:border-blue/60 hover:text-ink sm:min-h-8"
                        >
                          {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-6 text-ink-muted">Índice completo, com o que foi construído em cada uma.</p>
                )}
                <Link href="/landing-pages" className="group inline-flex min-h-10 items-center gap-2 self-start text-sm font-medium text-blue transition-colors hover:text-blue-bright">
                  Abrir índice
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
