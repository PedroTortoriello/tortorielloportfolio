import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Info, Mail } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Button } from "@/components/ui/button";
import { IPhone } from "@/components/ui/iphone";
import { profile } from "@/lib/data";
import { landingPages, nichesByCount, pagesInNiche, shot, type LandingPage, type Niche } from "@/lib/landing-pages";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Status chips: blue marks the niche's lead page; an approval preview is
// labelled in neutral ink (amber is reserved for code).
const chip = "inline-flex items-center rounded-[4px] border px-1.5 py-px font-mono text-[0.6875rem] uppercase leading-4 tracking-[0.1em]";
const featuredChip = `${chip} border-blue/50 text-blue`;
const previewChip = `${chip} border-line-strong text-ink-muted`;

type Crumb = { label: string; href?: string };

// Shared head of the landing-page routes: the drafting grid lit from the top
// right, the path as a mono breadcrumb running into a ruler, then the route's
// own title block.
export function RouteHeader({ trail, children }: { trail: Crumb[]; children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pt-24 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drafting-grid absolute inset-0 [mask-image:radial-gradient(ellipse_72%_66%_at_72%_0%,black_10%,transparent_76%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_0%,rgb(94_158_255/0.1),transparent_62%)]" />
      </div>
      <div className="container-x">
        <div className="flex items-center gap-4">
          <nav aria-label="Trilha" className="min-w-0">
            <ol className="flex flex-wrap items-center font-mono text-[0.75rem] text-ink-faint">
              {trail.map((c, i) => (
                <li key={`${i}-${c.label}`} className="flex min-w-0 items-center">
                  {i > 0 ? (
                    <span aria-hidden className="px-1.5 text-line-strong">
                      /
                    </span>
                  ) : null}
                  {c.href ? (
                    <Link href={c.href} className="-mx-1 inline-flex min-h-10 items-center px-1 transition-colors hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="truncate text-ink-muted">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span aria-hidden data-reveal="rule" className="ruler min-w-6 flex-1" />
        </div>
        {children}
      </div>
    </section>
  );
}

export function LpShowcase({
  lp,
  flip = false,
  as: Heading = "h2",
  details = true,
}: {
  lp: LandingPage;
  flip?: boolean;
  as?: "h1" | "h2";
  details?: boolean;
}) {
  const facts = [lp.city, lp.language ? `site em ${lp.language === "en" ? "inglês" : "espanhol"}` : null].filter(Boolean);
  const visit = lp.preview ? "Ver prévia" : "Visitar site";
  return (
    <article id={lp.slug} aria-labelledby={`${lp.slug}-title`} className="grid scroll-mt-24 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div data-reveal className={`relative pb-8 pr-8 sm:pb-10 sm:pr-14 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <a href={lp.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="group block">
          <BrowserFrame url={host(lp.url)} className="edge-light transition-transform duration-700 ease-out group-hover:-translate-y-1">
            <Image
              src={shot(lp.slug, "desktop")}
              alt=""
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 680px, 92vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
        </a>
        <IPhone src={shot(lp.slug, "mobile")} url={lp.url} sizes="170px" className="absolute bottom-0 right-0 w-[27%] min-w-[7rem] max-w-[10.5rem]" />
      </div>

      <div data-reveal style={d(100)} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Heading
          id={`${lp.slug}-title`}
          className={`display text-ink ${Heading === "h1" ? "text-[clamp(2.2rem,4.6vw,3.8rem)] [--wdth:108]" : "text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]"}`}
        >
          {lp.name}
        </Heading>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.8125rem] leading-6 text-ink-faint">
          <span className="font-medium text-ink-muted">{lp.kind}</span>
          {lp.featured ? <span className={featuredChip}>destaque</span> : null}
          {lp.preview ? <span className={previewChip}>versão em aprovação</span> : null}
          {facts.map((t) => (
            <span key={t}>· {t}</span>
          ))}
        </p>
        <p className="mt-5 text-pretty text-[0.9375rem] leading-7 text-ink-muted">{lp.summary}</p>
        {lp.note ? (
          <p className="mt-5 flex gap-2.5 rounded-[6px] border border-line bg-surface/70 px-3.5 py-3 text-[0.8125rem] leading-6 text-ink-muted">
            <Info aria-hidden className="mt-1 size-3.5 shrink-0 text-ink-faint" />
            {lp.note}
          </p>
        ) : null}
        <p className="label mt-8">O que foi construído</p>
        <ul className="mt-3 grid gap-2.5 border-t border-line pt-4">
          {lp.highlights.map((h) => (
            <li key={h} className="grid grid-cols-[1rem_1fr] gap-2 text-pretty text-[0.875rem] leading-6 text-ink">
              <span aria-hidden className="mt-[0.55rem] size-[7px] rounded-[1px] border border-blue/70" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.8125rem] leading-6 text-ink-faint">
          <span className="hud mr-2.5">stack</span>
          <span className="font-mono">{lp.stack}</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* the host is already in the frame's address bar; a long one would not fit a button at 390px.
              A niche page lists several of these, so the accessible name carries the page's name. */}
          <Button href={lp.url} external variant="secondary" arrow="out" ariaLabel={`${visit} de ${lp.name} (abre em nova aba)`}>
            {visit}
          </Button>
          {details ? (
            <Button href={`/landing-pages/${lp.niche}/${lp.slug}`} variant="ghost" arrow="right" className="min-h-10" ariaLabel={`Detalhes de ${lp.name}`}>
              Detalhes
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

// A capture plate linking to a page's detail route. `flags` adds the
// featured / approval chips (the index shows them; "more in this niche" doesn't).
export function LpCard({ lp, sizes, flags = false }: { lp: LandingPage; sizes: string; flags?: boolean }) {
  return (
    <Link href={`/landing-pages/${lp.niche}/${lp.slug}`} className="group block h-full rounded-[6px]">
      <div className="edge-light flex h-full flex-col rounded-[6px] border border-line bg-surface/60 transition-colors duration-300 group-hover:border-line-strong">
        <div className="overflow-hidden rounded-t-[5px] border-b border-line bg-bg">
          <Image
            src={shot(lp.slug, "desktop")}
            alt=""
            width={1440}
            height={900}
            sizes={sizes}
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="line-clamp-2 text-[0.9375rem] font-medium leading-snug text-ink">{lp.name}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-5 text-ink-faint">
              {lp.kind}
              {lp.city ? ` · ${lp.city}` : ""}
            </p>
            {flags && (lp.featured || lp.preview) ? (
              <p className="mt-2.5 flex flex-wrap gap-1.5">
                {lp.featured ? <span className={featuredChip}>destaque</span> : null}
                {lp.preview ? <span className={previewChip}>em aprovação</span> : null}
              </p>
            ) : null}
          </div>
          <ArrowRight
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-blue"
          />
        </div>
      </div>
    </Link>
  );
}

const tab = "relative flex min-h-11 items-center gap-2 px-3.5 text-[0.8125rem] transition-colors";
const tabOn = "text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-[2px] after:bg-blue after:shadow-[0_0_10px_rgb(94_158_255/0.8)]";
const tabCount = "font-mono text-[0.6875rem] tabular text-ink-faint";

export function NicheTabs({ current, exact = true }: { current?: string; exact?: boolean }) {
  return (
    <nav aria-label="Nichos" className="-mx-4 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] sm:-mx-1.5 sm:px-1.5">
      <ul className="flex min-w-max gap-1 border-b border-line">
        <li>
          <Link href="/landing-pages" aria-current={!current ? "page" : undefined} className={`${tab} ${!current ? tabOn : "text-ink-muted hover:text-ink"}`}>
            Todas
            <span className={tabCount}>{landingPages.length}</span>
          </Link>
        </li>
        {nichesByCount().map((n) => {
          const on = n.slug === current;
          return (
            <li key={n.slug}>
              <Link
                href={`/landing-pages/${n.slug}`}
                aria-current={on ? (exact ? "page" : "true") : undefined}
                className={`${tab} ${on ? tabOn : "text-ink-muted hover:text-ink"}`}
              >
                {n.name}
                <span className={tabCount}>{pagesInNiche(n.slug).length}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Closing band of the niche and detail routes: one console, one question, the
// e-mail as the primary action.
export function LpContactCta({ niche }: { niche: Niche }) {
  return (
    <section aria-labelledby="lp-cta-title" className="border-t border-line-faint py-20 lg:py-28">
      <div className="container-x">
        <div className="console ticks drafting-grid flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="lp-cta-title" className="display max-w-[22ch] text-[clamp(1.9rem,3.6vw,3rem)] text-ink [--wdth:106]">
            Precisa de uma landing page para {niche.name.toLowerCase()}?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Landing page · ${niche.name}`)}`}
              arrow="right"
              icon={<Mail aria-hidden className="size-4" strokeWidth={1.75} />}
            >
              Falar por e-mail
            </Button>
            <Button href="/#projetos" variant="secondary">
              Ver cases de engenharia
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
