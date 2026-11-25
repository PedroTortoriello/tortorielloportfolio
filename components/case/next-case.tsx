import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CoverMedia } from "@/components/media/cover-media";
import { CoverMorph } from "@/components/media/cover-morph";
import { content, localePath, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { fit } from "./case-hero";
import css from "./case.module.css";

const COPY = {
  en: { open: "Open case →", next: "Next case", back: "All work", count: (at: string, total: string) => `Case ${at} of ${total}` },
  pt: {
    open: "Abrir case →",
    next: "Próximo case",
    back: "Todos os projetos",
    count: (at: string, total: string) => `Case ${at} de ${total}`,
  },
} as const;

// The way out is the next case, as a poster: its cover, its title at full
// size and a lime "Open case" chip that follows the cursor (MotionRoot, fine
// pointers only). The four cases cycle; the index is one link away.
// pb-28 keeps the last row clear of the floating dock on phones.
export function NextCase({ current, locale = "en" }: { current: Project; locale?: Locale }) {
  const t = COPY[locale];
  const { projects } = content(locale);
  const at = projects.findIndex((p) => p.slug === current.slug);
  const next = projects[(at + 1) % projects.length];

  return (
    <section aria-labelledby="next-case-title" className="container-x pb-28 md:pb-[clamp(7rem,12vw,10rem)]">
      <Link
        href={localePath(locale, `/work/${next.slug}`)}
        aria-labelledby="next-case-title"
        data-chip-area
        className="group relative block overflow-hidden border border-line transition-colors duration-500 hover:border-line-strong focus-visible:border-line-strong"
      >
        <div data-mask className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* the cover alone morphs into the next case's hero; the scrim and the title stay */}
          <CoverMorph slug={next.slug} data-mask-img className="absolute inset-0 overflow-hidden">
            {/* the hover zoom has its own layer: GSAP owns [data-mask-img]'s transform */}
            <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]">
              <CoverMedia slug={next.slug} src={next.cover.src} alt="" sizes="(min-width: 1440px) 1336px, 94vw" />
            </div>
          </CoverMorph>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,#000_10%,rgb(0_0_0/0.85)_50%,rgb(0_0_0/0.35)_80%,transparent)]"
          />
          <span
            data-chip
            aria-hidden
            className="pointer-events-none invisible absolute left-0 top-0 z-10 whitespace-nowrap rounded-full bg-accent px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-accent opacity-0"
          >
            {t.open}
          </span>

          <div className="@container absolute inset-x-0 bottom-0 bg-[linear-gradient(to_bottom,transparent,rgb(0_0_0/0.6)_3.5rem)] p-5 pt-14 sm:p-10 sm:pt-14 lg:p-14">
            <h2 id="next-case-title">
              <span className="t-label block text-ink">
                <span className="t-bracket tabular">{next.index}</span> <span className="ml-2">{t.next}</span>
              </span>
              <span
                className={`${css.fit} mt-4 block font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-ink`}
                style={fit(next.title, "8rem")}
              >
                {next.title}
              </span>
            </h2>
            <div className="mt-5 flex items-center justify-between gap-6">
              <p className="t-label text-ink-muted">{next.category}</p>
              <ArrowRight
                aria-hidden
                strokeWidth={1.25}
                className="size-[clamp(2rem,4vw,3.5rem)] shrink-0 text-ink transition-[translate,color] duration-500 ease-[var(--ease-out)] group-hover:translate-x-2 group-hover:text-accent group-focus-visible:translate-x-2 group-focus-visible:text-accent"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={localePath(locale, "/work")}
          className="group/back inline-flex min-h-11 items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-4 transition-transform duration-300 group-hover/back:-translate-x-1" />
          {t.back}
        </Link>
        <p className="t-label tabular">{t.count(current.index, String(projects.length).padStart(3, "0"))}</p>
      </div>
    </section>
  );
}
