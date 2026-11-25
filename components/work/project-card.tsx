import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { statusIn } from "@/components/case/case-blocks";
import { CoverMedia } from "@/components/media/cover-media";
import { CoverMorph } from "@/components/media/cover-morph";
import { localePath, type Locale } from "@/lib/i18n";
import { isLive, type Project } from "@/lib/projects";

// Rendered widths in the work panel: one column on phones, two on tablets,
// three from 1024px (the wide card spans two), capped by the container.
const SIZES = {
  card: "(min-width: 1440px) 390px, (min-width: 1024px) 27vw, (min-width: 768px) 42vw, 92vw",
  wide: "(min-width: 1440px) 800px, (min-width: 1024px) 56vw, (min-width: 768px) 42vw, 92vw",
};

const COPY = { en: { view: "View case →" }, pt: { view: "Ver case →" } } as const;

// A featured project as the work reference draws it: the cover on top, then a
// bracketed index, the title in heavy caps and outline tags. On hover the cover
// leans in, a lime sheen crosses it and a "View case" chip follows the cursor
// (MotionRoot wires the chip on fine pointers only; elsewhere it stays hidden).
// Pass the project from content(locale): the card links to the case in the same locale.
export function ProjectCard({ project: p, wide = false, locale = "en" }: { project: Project; wide?: boolean; locale?: Locale }) {
  const id = `case-${p.slug}`;
  const live = isLive(p.status);

  return (
    <Link
      href={localePath(locale, `/work/${p.slug}`)}
      data-chip-area
      aria-labelledby={`${id}-title ${id}-status`}
      aria-describedby={p.note ? `${id}-summary ${id}-note` : `${id}-summary`}
      className="group flex h-full flex-col border border-line-strong bg-black transition-colors duration-500 hover:border-white/40 focus-visible:border-white/40"
    >
      <div data-mask className={`relative aspect-[3/2] shrink-0 overflow-hidden bg-surface ${wide ? "lg:aspect-[2.4/1]" : ""}`}>
        {/* the cover alone morphs into the case hero (the chip and the sheen stay behind) */}
        <CoverMorph slug={p.slug} data-mask-img className="absolute inset-0 overflow-hidden">
          {/* the hover zoom has its own layer: GSAP owns [data-mask-img]'s transform */}
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.06]">
            <CoverMedia slug={p.slug} src={p.cover.src} alt="" sizes={wide ? SIZES.wide : SIZES.card} />
          </div>
        </CoverMorph>
        {/* crosses once on hover, snaps back unseen on leave */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgb(194_245_92/0.3)_50%,transparent_70%)] mix-blend-screen transition-transform duration-0 group-hover:translate-x-full group-hover:duration-[1200ms] group-hover:ease-[var(--ease-out)]"
        />
        <span
          data-chip
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 z-10 whitespace-nowrap rounded-full bg-accent px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-accent opacity-0"
        >
          {COPY[locale].view}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-center gap-5">
          <span className="t-label t-bracket tabular text-ink-muted">{p.index}</span>
          {/* lime only when it is live; any other status stays a plain label */}
          <span id={`${id}-status`} className={`t-label flex items-center gap-2 ${live ? "text-accent" : ""}`}>
            {live ? (
              <span aria-hidden className="relative size-1.5">
                <span className="absolute inset-0 animate-[ping-soft_2.4s_var(--ease-out)_infinite] rounded-full bg-accent" />
                <span className="absolute inset-0 rounded-full bg-accent" />
              </span>
            ) : null}
            {statusIn(locale, p.status)}
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.5}
            className="ml-auto size-5 text-ink-muted transition-[rotate,color] duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:text-accent group-focus-visible:rotate-45 group-focus-visible:text-accent"
          />
        </div>

        {/* the wide card reads across: title on the left, summary and tags on the right */}
        <div className={`mt-6 flex flex-1 flex-col ${wide ? "lg:grid lg:grid-cols-2 lg:gap-x-10" : ""}`}>
          <div>
            <h3
              id={`${id}-title`}
              className="text-balance text-[clamp(1.6rem,2.2vw,2.1rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink"
            >
              {p.title}
            </h3>
            <p className="t-label mt-3">{p.category}</p>
          </div>
          <div className={`mt-5 flex flex-1 flex-col ${wide ? "lg:mt-0" : ""}`}>
            <p id={`${id}-summary`} className="line-clamp-3 text-[0.9375rem] leading-6 text-ink-muted">
              {p.summary}
            </p>
            {/* co-authorship travels with the project, in full */}
            {p.note ? (
              <p id={`${id}-note`} className="mt-4 text-[0.8125rem] leading-5 text-ink-faint">
                {p.note}
              </p>
            ) : null}
            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {p.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
