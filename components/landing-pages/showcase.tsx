import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Info, Mail } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Button } from "@/components/ui/button";
import { IPhone } from "@/components/ui/iphone";
import { profile } from "@/lib/data";
import { landingPages, nichesByCount, pagesInNiche, shot, type LandingPage, type Niche } from "@/lib/landing-pages";

// The landing-page area speaks in the work reference's voice: bracketed mono
// labels, heavy grotesk caps with a grey second line, capture cards with an
// index and outline tags, lime only where something acts. It closes in the
// contact reference's voice. The copy is Brazilian Portuguese.

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
export const pad = (n: number, size = 2) => String(n).padStart(size, "0");

/** Heavy grotesk caps: every title in this area. */
export const headline = "font-sans font-extrabold uppercase leading-[0.98] tracking-[-0.045em] text-balance break-words";
/** A title made of <Line>s: a flex column, so the masks' negative margins add up instead of collapsing. */
export const lines = "flex flex-col";

// One title line rising out of its mask on first paint. The mask is padded
// above and below so accents and cedillas survive the tight leading.
export function Line({
  children,
  grey = false,
  slash = false,
  delay = 0,
}: {
  children: ReactNode;
  grey?: boolean;
  slash?: boolean;
  delay?: number;
}) {
  return (
    <span className="mask-line -my-[0.2em] py-[0.2em]">
      <span className={grey ? "text-ink-faint" : "text-ink"} style={d(delay)}>
        {slash ? <span aria-hidden>{"//"}</span> : null}
        {children}
      </span>
    </span>
  );
}

type Crumb = { label: string; href?: string };

// Head of the three routes: the path as a mono trail running into a hairline,
// then the work reference's row (a bracketed label on the left from lg, the
// title, a short text on the right from xl), then the facts and the niches.
export function RouteHeader({
  trail,
  label,
  title,
  aside,
  children,
}: {
  trail: Crumb[];
  label: string;
  title: ReactNode;
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="pt-[calc(var(--header-h)+clamp(1.75rem,5vw,4.5rem))]">
      <div className="container-x">
        <div className="enter-fade flex items-center gap-4">
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
                    <Link
                      href={c.href}
                      aria-label={c.href === "/" ? "Início" : undefined}
                      className="-mx-1 inline-flex min-h-11 items-center px-1 transition-colors duration-300 hover:text-accent"
                    >
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
          <span aria-hidden className="h-px min-w-6 flex-1 bg-line" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-y-8 sm:mt-14 lg:grid-cols-12 lg:gap-x-6">
          {/* decoration: the reference's [CASE STUDY] corner; phones start with the trail instead */}
          <p aria-hidden className="enter-fade t-label hidden pt-[0.45em] lg:col-span-2 lg:block">
            <span className="t-bracket">{label}</span>
          </p>
          <div className="lg:col-span-10 xl:col-span-7">{title}</div>
          <div className="enter lg:col-span-7 lg:col-start-3 xl:col-span-3 xl:col-start-10 xl:self-end" style={d(300)}>
            {aside}
          </div>
        </div>

        <div className="enter mt-12 border-t border-line pt-6 sm:mt-16" style={d(420)}>
          {children}
        </div>
      </div>
    </header>
  );
}

const pill =
  "inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full border px-4 text-[0.8125rem] transition-colors duration-300";

// Every niche as an outline pill with its count; the current one is filled.
// Phones scroll the row sideways (the fade on the right says there is more);
// from lg the pills wrap.
export function NicheTabs({ current, exact = true }: { current?: string; exact?: boolean }) {
  const tab = (href: string, name: string, count: number, on: boolean) => (
    <Link
      href={href}
      aria-current={on ? (exact ? "page" : "true") : undefined}
      className={`${pill} ${on ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-muted hover:border-accent hover:text-accent"}`}
    >
      {name}
      <span className={`font-mono text-[0.6875rem] tabular ${on ? "text-bg/60" : "text-ink-faint"}`}>{count}</span>
    </Link>
  );
  return (
    <nav
      aria-label="Nichos"
      className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] py-1.5 [scrollbar-width:none] max-lg:[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-2 pr-10 lg:w-auto lg:flex-wrap lg:pr-0">
        <li>{tab("/landing-pages", "Todas", landingPages.length, !current)}</li>
        {nichesByCount().map((n) => (
          <li key={n.slug}>{tab(`/landing-pages/${n.slug}`, n.name, pagesInNiche(n.slug).length, n.slug === current)}</li>
        ))}
      </ul>
    </nav>
  );
}

// A capture card after the work reference: the page on top, then its number
// in the niche, its name and its tags. `flags` adds the featured / approval tags.
export function LpCard({ lp, n, sizes, flags = false }: { lp: LandingPage; n: number; sizes: string; flags?: boolean }) {
  return (
    <Link
      href={`/landing-pages/${lp.niche}/${lp.slug}`}
      className="group flex h-full flex-col border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
    >
      <span className="block overflow-hidden border-b border-line bg-elevated">
        <Image
          src={shot(lp.slug, "desktop")}
          alt=""
          width={1440}
          height={900}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-[1.1s] ease-[var(--ease-out)] group-hover:scale-[1.045]"
        />
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span aria-hidden className="t-label t-bracket tabular">
          {pad(n, 3)}
        </span>
        <span className="mt-4 text-[1.1875rem] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.3125rem]">
          {lp.name}
        </span>
        <span className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-2 pt-5">
          <span className="tag">{lp.kind}</span>
          {flags && lp.featured ? <span className="tag text-ink">destaque</span> : null}
          {flags && lp.preview ? <span className="tag border-dashed">em aprovação</span> : null}
          {lp.city ? <span className="t-label ml-1.5">{lp.city}</span> : null}
        </span>
      </span>
    </Link>
  );
}

// Kind and status as outline tags (featured in ink, approval dashed), then
// place and language in mono.
export function LpTags({ lp, className = "" }: { lp: LandingPage; className?: string }) {
  const facts = [lp.city, lp.language ? `site em ${lp.language === "en" ? "inglês" : "espanhol"}` : null].filter(Boolean);
  return (
    <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-2 ${className}`}>
      <span className="tag">{lp.kind}</span>
      {lp.featured ? <span className="tag text-ink">destaque</span> : null}
      {lp.preview ? <span className="tag border-dashed">versão em aprovação</span> : null}
      {facts.length ? <span className="t-label ml-1.5 leading-5">{facts.join(" · ")}</span> : null}
    </div>
  );
}

// The page in a browser frame with its phone capture over the corner. On
// scroll the frame clips in from below while the capture settles inside it,
// and the phone drifts against the scroll. Both are pictures: the real link
// is the button beside them.
export function LpMedia({
  lp,
  sizes,
  wide = false,
  className = "",
}: {
  lp: LandingPage;
  sizes: string;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative pb-8 pr-8 sm:pb-12 sm:pr-14 ${className}`}>
      <div data-mask>
        <a href={lp.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="group block">
          <BrowserFrame
            url={host(lp.url)}
            className="transition-[translate,border-color] duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:border-ink-faint"
          >
            <div className="overflow-hidden">
              <Image
                data-mask-img
                src={shot(lp.slug, "desktop")}
                alt=""
                width={1440}
                height={900}
                sizes={sizes}
                className="h-auto w-full"
              />
            </div>
          </BrowserFrame>
        </a>
      </div>
      <div data-parallax="-0.14" className={`absolute bottom-0 right-0 w-[26%] min-w-[5.5rem] ${wide ? "max-w-[14rem]" : "max-w-[11rem]"}`}>
        <IPhone src={shot(lp.slug, "mobile")} url={lp.url} sizes={wide ? "224px" : "176px"} />
      </div>
    </div>
  );
}

// Note, what was built (numbered between hairlines) and the stack.
export function LpFacts({ lp, as: Heading = "h3" }: { lp: LandingPage; as?: "h2" | "h3" }) {
  return (
    <>
      {lp.note ? (
        <p className="mt-6 flex gap-3 border-l border-line-strong py-0.5 pl-4 text-[0.875rem] leading-6 text-ink-muted">
          <Info aria-hidden className="mt-[0.3rem] size-3.5 shrink-0 text-ink-faint" />
          {lp.note}
        </p>
      ) : null}
      <Heading id={`${lp.slug}-construido`} className="t-label mt-9">
        O que foi construído
      </Heading>
      <ul className="mt-3 border-t border-line">
        {lp.highlights.map((h, i) => (
          <li key={h} className="grid grid-cols-[2rem_1fr] border-b border-line py-3 text-pretty text-[0.9375rem] leading-6 text-ink">
            <span aria-hidden className="font-mono text-[0.6875rem] leading-6 text-ink-faint tabular">
              {pad(i + 1)}
            </span>
            {h}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="t-label">Stack</span>
        <span className="font-mono text-[0.8125rem] leading-6 text-ink-muted">{lp.stack}</span>
      </p>
    </>
  );
}

// One page of a niche: a slate (its number running into a hairline), then
// the captures and the text side by side, alternating sides down the page.
export function LpShowcase({ lp, n, flip = false }: { lp: LandingPage; n: number; flip?: boolean }) {
  const visit = lp.preview ? "Ver prévia" : "Visitar site";
  return (
    <article id={lp.slug} aria-labelledby={`${lp.slug}-title`} className="scroll-mt-[calc(var(--header-h)+1.5rem)]">
      <div className="flex items-center gap-4">
        <span aria-hidden className="t-label t-bracket tabular">
          {pad(n, 3)}
        </span>
        <span aria-hidden data-reveal="rule" className="h-px flex-1 bg-line" />
      </div>
      {/* grid-cols-1 = minmax(0, 1fr): the column never grows to its content's min width on phones */}
      <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <LpMedia
          lp={lp}
          sizes="(min-width: 1440px) 690px, (min-width: 1024px) 48vw, 88vw"
          className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        />
        <div data-reveal style={d(120)} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <h2 id={`${lp.slug}-title`} className={`${headline} text-[clamp(1.9rem,3.1vw,2.85rem)] text-ink`}>
            {lp.name}
          </h2>
          <LpTags lp={lp} className="mt-5" />
          <p className="mt-6 text-pretty text-[1rem] leading-7 text-ink-muted">{lp.summary}</p>
          <LpFacts lp={lp} />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* the host is already in the frame's address bar; the accessible name carries the page's name */}
            <Button href={lp.url} external variant="secondary" arrow="out" ariaLabel={`${visit} de ${lp.name} (abre em nova aba)`}>
              {visit}
            </Button>
            <Button href={`/landing-pages/${lp.niche}/${lp.slug}`} variant="ghost" arrow="right" ariaLabel={`Detalhes de ${lp.name}`}>
              Detalhes
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

const pillLink = "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[0.9375rem] transition-colors duration-300";

// Closing band of the niche and detail routes, in the contact reference's
// voice: a wide italic question with a serif tail, two pill links, the e-mail
// in lime. Its charcoal runs on into the site footer; the bottom padding keeps
// the pills clear of the dock on phones.
export function LpContactCta({ niche }: { niche: Niche }) {
  return (
    <section aria-labelledby="lp-cta-title" className="grain mt-28 bg-charcoal sm:mt-36 lg:mt-44">
      <div className="container-x relative z-[2] pb-32 pt-24 text-center sm:pb-36 sm:pt-32 lg:py-40">
        <p className="t-label">
          <span className="t-bracket">Contato</span>
        </p>
        <h2
          id="lp-cta-title"
          data-reveal
          className="mx-auto mt-8 max-w-[19ch] text-balance font-wide text-[clamp(2.1rem,6.4vw,6rem)] font-extrabold italic leading-[0.98] tracking-[-0.025em] text-ink [font-variation-settings:'wdth'_112] sm:[font-variation-settings:'wdth'_132]"
        >
          Precisa de uma landing page <span className="font-serif font-normal tracking-normal">para {niche.name.toLowerCase()}?</span>
        </h2>
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          <li>
            <span data-magnetic="0.25" className="inline-block">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Landing page · ${niche.name}`)}`}
                className={`${pillLink} border-accent text-accent hover:bg-accent hover:text-on-accent`}
              >
                <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                Falar por e-mail
              </a>
            </span>
          </li>
          <li>
            <span data-magnetic="0.25" className="inline-block">
              <Link href="/#work" className={`${pillLink} border-line-strong text-ink hover:border-accent hover:text-accent`}>
                Ver cases de engenharia
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
