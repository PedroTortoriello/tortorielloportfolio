import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CoverMedia } from "@/components/media/cover-media";
import { CoverMorph } from "@/components/media/cover-morph";
import { content, localePath, type Locale } from "@/lib/i18n";
import { landingPages, niches } from "@/lib/landing-pages";
import type { Project } from "@/lib/projects";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

const COPY = {
  en: {
    title: ["All", "work"],
    lead: "Case studies first, then an archive of products, pilots and client systems, each with its stack and, where public, its links.",
    count: (cases: number, more: number) => `${pad(cases)} cases · ${more} in the archive`,
    cases: "Case studies",
    archive: "Archive",
    newTab: "opens in a new tab",
    year: "Year",
    role: "Role",
    note: "Note",
    lpCount: (pages: number, groups: number) => `${pages} pages · ${groups} niches`,
    lpMeta: "Landing pages and institutional sites, grouped by niche. The area is in Portuguese.",
  },
  pt: {
    title: ["Todos os", "projetos"],
    lead: "Primeiro os estudos de caso, depois um arquivo de produtos, pilotos e sistemas de clientes, cada um com a sua stack e, quando públicos, os seus links.",
    count: (cases: number, more: number) => `${pad(cases)} cases · ${more} no arquivo`,
    cases: "Estudos de caso",
    archive: "Arquivo",
    newTab: "abre em uma nova aba",
    year: "Ano",
    role: "Papel",
    note: "Nota",
    lpCount: (pages: number, groups: number) => `${pages} páginas · ${groups} nichos`,
    // the English line also says the area is in Portuguese; on this site that goes without saying
    lpMeta: "Landing pages e sites institucionais, agrupados por nicho.",
  },
} as const;

// The heading's two words: stacked on phones and one line from tablets in English;
// the Portuguese title has three words, so it stays on two lines at every width.
const TITLE = {
  en: {
    h1: "text-[clamp(3.5rem,27vw,13rem)] md:text-[clamp(3.5rem,15.5vw,14.5rem)]",
    line: "mask-line md:-mr-[0.06em] md:inline-block md:pr-[0.06em] md:align-top",
  },
  pt: { h1: "text-[clamp(2.75rem,15vw,12.5rem)]", line: "mask-line" },
} as const;

// The index behind "View all projects": the four cases as large rows, the
// archive as a typographic list, then the way into the landing-page area.
// The header uses the CSS first-paint entrances (it is on screen at load);
// everything below opts into MotionRoot. /work and /pt/work both render it.
export function WorkIndex({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const { projects, archive } = content(locale);
  const [first, second] = t.title;
  return (
    <div className="pb-[clamp(8rem,14vw,12rem)]">
      <header className="container-x pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))]">
        <h1 className={`${TITLE[locale].h1} font-extrabold uppercase leading-[0.84] tracking-[-0.05em]`}>
          <span className={TITLE[locale].line}>
            <span className="before:content-['//'_/_'']">{first}</span>
          </span>{" "}
          <span className={TITLE[locale].line}>
            <span className="text-[#8a8a8a]" style={d(90)}>
              {second}
            </span>
          </span>
        </h1>
        <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-x-6">
          <p className="enter max-w-[36ch] text-lg leading-[1.45] text-ink-muted md:col-span-8" style={d(200)}>
            {t.lead}
          </p>
          <p className="enter t-label t-bracket tabular md:col-span-4 md:justify-self-end" style={d(260)}>
            {t.count(projects.length, archive.length)}
          </p>
        </div>
      </header>

      <section aria-labelledby="cases-title" className="container-x mt-[clamp(5rem,10vw,9rem)]">
        <SectionHead id="cases-title" title={t.cases} count={projects.length} />
        <ul data-stagger className="border-t border-line">
          {/* each row is a target (/work#slug): a case's back link lands on its row, so the cover can morph home */}
          {projects.map((p) => (
            <li key={p.slug} id={p.slug} className="scroll-mt-[calc(var(--header-h)+2rem)] border-b border-line">
              <CaseRow project={p} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="archive-title" className="container-x mt-[clamp(5rem,10vw,9rem)]">
        <SectionHead id="archive-title" title={t.archive} count={archive.length} />
        <ul data-stagger className="border-t border-line">
          {archive.map((a, i) => (
            <li
              key={a.title}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 gap-y-4 border-b border-line py-7 lg:grid-cols-12 lg:gap-x-6 lg:py-9"
            >
              <span aria-hidden className="t-label tabular pt-1.5">
                {pad(i + 1)}
              </span>
              <div className="lg:col-span-3">
                <h3 className="text-[1.375rem] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink">{a.title}</h3>
                <p className="t-label mt-3">
                  {a.kind}
                  {a.year ? ` · ${a.year}` : null}
                </p>
              </div>
              <div className="col-start-2 lg:col-span-5 lg:col-start-5">
                <p className="max-w-[62ch] text-[0.9375rem] leading-6 text-ink-muted">{a.text}</p>
                <p className="mt-3 font-mono text-[0.75rem] leading-5 text-ink-faint">{a.stack}</p>
              </div>
              <div className="col-start-2 lg:col-span-3 lg:col-start-10">
                {a.links.length ? (
                  <ul className="-my-2 flex flex-wrap gap-x-6 lg:-mt-3 lg:flex-col lg:items-start">
                    {a.links.map((l) => (
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
                            className="size-3.5 text-ink-faint transition-[translate,color] duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
                          />
                          <span className="sr-only">
                            {" "}
                            ({a.title}, {t.newTab})
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {a.note ? <p className="t-label lg:pt-1.5">{a.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lp-title" className="container-x mt-[clamp(5rem,10vw,9rem)]">
        <Link
          href="/landing-pages"
          hrefLang="pt-BR"
          aria-labelledby="lp-title"
          aria-describedby="lp-count lp-meta"
          className="group relative isolate block overflow-hidden border border-line-strong px-6 py-9 transition-colors duration-500 hover:text-on-accent focus-visible:text-on-accent sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
          {/* the lime fill rises behind the type */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
          />
          <div className="flex items-start justify-between gap-6">
            <span className="t-label t-bracket transition-colors duration-500 group-hover:text-on-accent group-focus-visible:text-on-accent">
              PT-BR
            </span>
            <span
              id="lp-count"
              className="t-label tabular transition-colors duration-500 group-hover:text-on-accent group-focus-visible:text-on-accent"
            >
              {t.lpCount(landingPages.length, niches.length)}
            </span>
          </div>
          <div className="mt-10 flex items-end justify-between gap-6">
            <h2 id="lp-title" className="text-[clamp(2.4rem,7.4vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em]">
              <span className="block">Landing</span>
              <span className="block">pages</span>
            </h2>
            <ArrowRight
              aria-hidden
              strokeWidth={1.25}
              className="size-[clamp(2.5rem,6vw,5rem)] shrink-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2"
            />
          </div>
          <p
            id="lp-meta"
            className="mt-8 max-w-[44ch] text-[0.9375rem] leading-6 text-ink-muted transition-colors duration-500 group-hover:text-on-accent group-focus-visible:text-on-accent"
          >
            {t.lpMeta}
          </p>
        </Link>
      </section>
    </div>
  );
}

function SectionHead({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div className="flex items-end justify-between gap-6 pb-6 lg:pb-8">
      <h2 id={id} data-split="lines" className="text-[clamp(1.9rem,4vw,3.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
        {title}
      </h2>
      <p aria-hidden className="t-label t-bracket tabular">
        {pad(count)}
      </p>
    </div>
  );
}

// One featured case as a large row. Phones stack it (index and arrow, cover,
// title, facts); tablets set the cover beside the text; from 1024px it is a
// single 12-column line: index, cover, title, year and role, arrow.
function CaseRow({ project: p, locale }: { project: Project; locale: Locale }) {
  const t = COPY[locale];
  const id = `row-${p.slug}`;
  return (
    <Link
      href={localePath(locale, `/work/${p.slug}`)}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-meta`}
      className="group relative grid gap-y-5 py-7 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-[var(--ease-out)] hover:after:scale-x-100 focus-visible:after:scale-x-100 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-x-8 lg:grid-cols-12 lg:grid-rows-none lg:items-center lg:gap-x-6 lg:py-8"
    >
      {/* index and arrow share a bar until 1024px, then take their own columns */}
      <div className="flex items-center justify-between md:col-start-2 md:row-start-1 lg:contents">
        <span className="t-label t-bracket tabular lg:col-start-1 lg:row-start-1">{p.index}</span>
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="size-6 text-ink-muted transition-[rotate,color] duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:text-accent group-focus-visible:rotate-45 group-focus-visible:text-accent lg:col-start-12 lg:row-start-1 lg:justify-self-end"
        />
      </div>
      <div
        data-mask
        className="relative aspect-[3/2] overflow-hidden bg-surface md:col-start-1 md:row-span-3 md:row-start-1 lg:col-span-3 lg:col-start-2 lg:row-span-1 lg:row-start-1"
      >
        {/* morphs into the case hero and back (components/media/cover-morph.tsx) */}
        <CoverMorph slug={p.slug} data-mask-img className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.06]">
            <CoverMedia
              slug={p.slug}
              src={p.cover.src}
              alt=""
              sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, (min-width: 768px) 46vw, 92vw"
            />
          </div>
        </CoverMorph>
      </div>
      <div className="md:col-start-2 md:row-start-2 lg:col-span-4 lg:col-start-5 lg:row-start-1">
        <h3
          id={`${id}-title`}
          className="text-balance text-[clamp(1.75rem,3.2vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ink transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2"
        >
          {p.title}
        </h3>
        <p className="t-label mt-3">{p.category}</p>
      </div>
      <dl
        id={`${id}-meta`}
        className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-10 md:col-start-2 md:row-start-3 md:self-end lg:col-span-3 lg:col-start-9 lg:row-start-1 lg:gap-x-6 lg:self-center"
      >
        <div>
          <dt className="t-label">{t.year}</dt>
          <dd className="tabular mt-2 whitespace-nowrap text-[0.9375rem] text-ink-muted">{p.year}</dd>
        </div>
        <div>
          <dt className="t-label">{t.role}</dt>
          <dd className="mt-2 text-[0.9375rem] leading-6 text-ink-muted">{p.role}</dd>
        </div>
        {/* co-authorship travels with the project, in full */}
        {p.note ? (
          <div className="col-span-2 mt-5">
            <dt className="t-label">{t.note}</dt>
            <dd className="mt-2 text-[0.8125rem] leading-5 text-ink-faint">{p.note}</dd>
          </div>
        ) : null}
      </dl>
    </Link>
  );
}
