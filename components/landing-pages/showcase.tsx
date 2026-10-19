import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { nichesByCount, shot, type LandingPage } from "@/lib/landing-pages";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
export const lpHost = host;

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
  return (
    <article id={lp.slug} aria-labelledby={`${lp.slug}-title`} className="grid-cols-1 grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-12">
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
        <PhoneFrame className="absolute bottom-0 right-0 w-[26%] min-w-[6.5rem] max-w-[10rem]">
          <Image src={shot(lp.slug, "mobile")} alt="" width={780} height={1688} sizes="160px" className="h-auto w-full" />
        </PhoneFrame>
      </div>

      <div data-reveal style={d(100)} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Heading
          id={`${lp.slug}-title`}
          className={`font-medium leading-tight tracking-[-0.035em] text-ink ${Heading === "h1" ? "text-[clamp(2.2rem,4.6vw,3.6rem)]" : "text-[clamp(1.75rem,3vw,2.4rem)]"}`}
        >
          {lp.name}
        </Heading>
        <p className="mt-3 text-[0.82rem] leading-6 text-ink-faint">
          <span className="font-medium text-ink-muted">{lp.kind}</span>
          {lp.preview ? (
            <span className="ml-2 inline-block rounded-full border border-amber/40 px-2 py-px align-[1px] text-[0.7rem] text-amber">
              versão em aprovação
            </span>
          ) : null}
          {[lp.city, lp.language ? `site em ${lp.language === "en" ? "inglês" : "espanhol"}` : null]
            .filter(Boolean)
            .map((t) => `\u00a0· ${t}`)
            .join(" ")}
        </p>
        <p className="mt-4 text-pretty text-[0.98rem] leading-7 text-ink-muted">{lp.summary}</p>
        {lp.note ? (
          <p className="mt-4 flex gap-2.5 rounded-lg border border-line bg-surface/70 px-3.5 py-3 text-[0.82rem] leading-6 text-ink-muted">
            <Info aria-hidden className="mt-1 size-3.5 shrink-0 text-ink-faint" />
            {lp.note}
          </p>
        ) : null}
        <p className="label mt-7">o que foi construído</p>
        <ul className="mt-3 grid gap-2.5">
          {lp.highlights.map((h) => (
            <li key={h} className="grid grid-cols-[1rem_1fr] gap-2 text-[0.9rem] leading-6 text-ink">
              <span aria-hidden className="mt-[0.6rem] size-1.5 rounded-[2px] bg-blue" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[0.7rem] text-ink-faint">{lp.stack}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          <a
            href={lp.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-blue"
          >
            {lp.preview ? "Ver prévia" : `Visitar ${host(lp.url).split("/")[0]}`}
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {details ? (
            <Link
              href={`/landing-pages/${lp.niche}/${lp.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
              aria-label={`Detalhes de ${lp.name}`}
            >
              Detalhes
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function NicheTabs({ current, exact = true }: { current?: string; exact?: boolean }) {
  return (
    <nav aria-label="Nichos" className="-mx-4 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] sm:-mx-1.5 sm:px-1.5">
      <ul className="flex min-w-max gap-1 border-b border-line">
        <li>
          <Link
            href="/landing-pages"
            aria-current={!current ? "page" : undefined}
            className={`relative block px-3.5 py-3 text-[0.84rem] transition-colors ${!current ? "text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-[2px] after:bg-blue" : "text-ink-muted hover:text-ink"}`}
          >
            Todas
          </Link>
        </li>
        {nichesByCount().map((n) => {
          const on = n.slug === current;
          return (
            <li key={n.slug}>
              <Link
                href={`/landing-pages/${n.slug}`}
                aria-current={on ? (exact ? "page" : "true") : undefined}
                className={`relative block px-3.5 py-3 text-[0.84rem] transition-colors ${on ? "text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-[2px] after:bg-blue" : "text-ink-muted hover:text-ink"}`}
              >
                {n.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
