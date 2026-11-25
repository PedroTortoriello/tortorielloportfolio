import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CoverMedia } from "@/components/media/cover-media";
import { CoverMorph } from "@/components/media/cover-morph";
import { localePath, type Locale } from "@/lib/i18n";
import { isLive, type Project } from "@/lib/projects";
import { statusIn } from "./case-blocks";
import css from "./case.module.css";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const COPY = {
  en: {
    label: "Case study",
    back: "All work",
    ships: "Ships as",
    category: "Category",
    year: "Year",
    role: "Role",
    status: "Status",
    links: "Links",
    newTab: "(opens in a new tab)",
  },
  pt: {
    label: "Estudo de caso",
    back: "Todos os projetos",
    ships: "Lançado como",
    category: "Categoria",
    year: "Ano",
    role: "Papel",
    status: "Status",
    links: "Links",
    newTab: "(abre em uma nova aba)",
  },
} as const;

// Inputs for css.fit: the longest word and the size cap.
export const fit = (title: string, max: string) =>
  ({
    "--chars": Math.max(...title.split(" ").map((w) => w.length)),
    "--max": max,
  }) as CSSProperties;

// The case's opening shot. From tablets the cover fills the viewport and the
// title sits at its foot; on phones the cover takes the top and the title
// overlaps its lower edge. The text carries its own scrim, so contrast holds
// over the pale art at any viewport height. CSS opens it on first paint (css.open, css.settle).
export function CaseHero({ project: p, locale = "en" }: { project: Project; locale?: Locale }) {
  const t = COPY[locale];
  return (
    <section
      aria-labelledby="case-title"
      className="relative isolate md:flex md:min-h-[100svh] md:flex-col md:justify-end md:pt-[var(--header-h)]"
    >
      {/* the cover a work card morphs into; arriving that way, CoverMorph finishes the CSS opening */}
      <CoverMorph
        slug={p.slug}
        className="relative h-[62svh] min-h-80 overflow-hidden bg-surface md:absolute md:inset-0 md:h-auto md:min-h-0"
      >
        <div className={`absolute inset-0 ${css.open}`}>
          <div className={`absolute inset-0 ${css.settle}`}>
            <CoverMedia slug={p.slug} src={p.cover.src} alt={p.cover.alt} sizes="100vw" preload />
          </div>
        </div>
      </CoverMorph>

      <div className="relative -mt-40 bg-[linear-gradient(to_bottom,transparent,rgb(0_0_0/0.65)_6rem,rgb(0_0_0/0.92)_55%,#000)] pt-24 md:mt-0">
        <div className="@container container-x pb-[clamp(2.5rem,5vw,4.5rem)]">
          <div className="enter flex items-center justify-between gap-6" style={d(60)}>
            <p className="t-label text-ink">
              <span className="t-bracket tabular">{p.index}</span> <span className="ml-2">{t.label}</span>
            </p>
            {/* lands on this case's row of the index, where the cover can morph back into place */}
            <Link
              href={localePath(locale, `/work#${p.slug}`)}
              className="group/back -my-3 inline-flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
              {t.back}
            </Link>
          </div>

          {/* each word is its own masked line on phones; from tablets they flow and wrap */}
          <h1
            id="case-title"
            className={`${css.fit} mt-5 font-sans font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-ink`}
            style={fit(p.title, "9.5rem")}
          >
            {p.title.split(" ").map((w, i) => (
              <Fragment key={w}>
                {i > 0 ? " " : null}
                {/* the right padding keeps the negative tracking from clipping the last glyph */}
                <span className="mask-line md:inline-block md:pr-[0.06em] md:align-top">
                  <span style={d(140 + i * 90)}>{w}</span>
                </span>
              </Fragment>
            ))}
          </h1>

          {p.product ? (
            <p className="enter mt-6 text-[clamp(1rem,1.5vw,1.25rem)] leading-snug text-ink-muted" style={d(300)}>
              {t.ships} <span className="text-ink">{p.product}</span>
            </p>
          ) : null}

          <dl
            className="enter mt-[clamp(2rem,4.5vw,3.5rem)] grid grid-flow-row-dense grid-cols-2 gap-x-6 gap-y-6 border-t border-line-strong pt-6 md:grid-cols-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,1.3fr)]"
            style={d(380)}
          >
            <Meta label={t.category} className="col-span-2 md:col-span-1">
              {p.category}
            </Meta>
            <Meta label={t.year}>
              <span className="tabular whitespace-nowrap">{p.year}</span>
            </Meta>
            <Meta label={t.role} className="col-span-2 md:col-span-1">
              {p.role}
            </Meta>
            <Meta label={t.status}>
              <span className="inline-flex items-center gap-2.5">
                {isLive(p.status) ? (
                  <span aria-hidden className="relative grid size-2 place-items-center">
                    <span className="motion-only absolute inset-0 animate-[ping-soft_2.4s_ease-out_infinite] rounded-full bg-accent" />
                    <span className="relative size-1.5 rounded-full bg-accent" />
                  </span>
                ) : null}
                {statusIn(locale, p.status)}
              </span>
            </Meta>
            <Meta label={t.links} className="col-span-2 md:col-span-1">
              <ul className="-my-2.5">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex min-h-11 items-center gap-2 font-mono text-[0.8125rem] text-ink transition-colors hover:text-accent"
                    >
                      <span className="link-draw">{l.label}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 text-ink-muted transition-[translate,color] duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
                      />
                      <span className="sr-only"> {t.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Meta>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <dt className="t-label">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-6 text-ink">{children}</dd>
    </div>
  );
}
