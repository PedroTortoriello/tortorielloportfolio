import Image from "next/image";
import Link from "next/link";
import { Telemetry } from "@/components/live/telemetry";
import { ProjectCard } from "@/components/work/project-card";
import { content, localePath, type Locale } from "@/lib/i18n";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

const COPY = {
  en: {
    label: "Case study",
    title: ["Precision", "Driven projects"],
    lead: "Engineering intelligent systems and adaptive digital products.",
    cta: "View all projects",
    index: (cases: string, more: number) => `Index · ${cases} cases · ${more} more in the archive`,
  },
  pt: {
    label: "Estudo de caso",
    title: ["Projetos", "de precisão"],
    lead: "Projetando sistemas inteligentes e produtos digitais adaptáveis.",
    cta: "Ver todos os projetos",
    index: (cases: string, more: number) => `Índice · ${cases} cases · mais ${more} no arquivo`,
  },
} as const;

// "Selected work", after the work reference: a pale fog wall with monochrome
// art around it and a black panel hung on it, a little off-centre (more wall
// on the right). Inside: the bracketed label, the two-tone headline, and the
// four featured projects, three across, then 004 wide beside the live
// telemetry panel and the lime CTA.
// On phones the panel runs edge to edge and the wall shows above and below.
export function Work({ locale = "en" }: { locale?: Locale }) {
  const { archive, projects } = content(locale);
  const t = COPY[locale];
  return (
    <section id="work" aria-labelledby="work-title" className="grain overflow-clip bg-fog py-[clamp(4.5rem,14vh,11rem)]">
      {/* overscanned so the drift never shows an edge */}
      <div aria-hidden data-parallax="-0.1" className="absolute inset-x-0 -inset-y-[10%] -z-10">
        <Image src="/work/wall.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="container-x max-md:px-0">
        {/* @container: the headline is sized against the panel (cqi), so it sets the same at any width */}
        <div className="@container bg-black px-[var(--gutter)] pb-14 pt-16 md:px-8 md:pb-10 md:pt-20 lg:mr-[4%] lg:px-[clamp(1.75rem,2.5vw,2.75rem)] lg:pb-[clamp(2.5rem,4vw,4rem)] lg:pt-[clamp(4rem,6.5vw,6.5rem)]">
          <header className="lg:grid lg:grid-cols-12 lg:gap-x-[1.125rem]">
            <p data-reveal className="t-label t-bracket text-ink-muted lg:col-span-2 lg:mt-1">
              {t.label}
            </p>
            {/* three lines on phones, two from tablets; the slashes are drawn, not read */}
            <h2
              id="work-title"
              data-split="lines"
              className="mt-6 text-[clamp(2.6rem,13cqi,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:text-[clamp(2.6rem,9.5cqi,5.5rem)] lg:col-span-7 lg:mt-0 lg:text-[clamp(2.6rem,6.4cqi,6rem)]"
            >
              <span className="block whitespace-nowrap text-ink before:content-['//'_/_'']">{t.title[0]}</span>{" "}
              <span className="block text-[#8a8a8a]">{t.title[1]}</span>
            </h2>
            <p
              data-reveal
              style={d(160)}
              className="mt-8 max-w-[24ch] text-lg leading-[1.45] text-ink-muted md:ml-auto md:max-w-[19rem] lg:col-span-3 lg:col-start-10 lg:ml-0 lg:mt-0 lg:max-w-none lg:self-end"
            >
              {t.lead}
            </p>
          </header>

          <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:mt-[clamp(3rem,5.5vw,5.5rem)] lg:grid-cols-3 lg:gap-[1.125rem]">
            {/* from 1024px the list shares the outer grid (subgrid), so the CTA can take the cell beside 004 */}
            <ul
              data-stagger
              className="grid gap-4 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-[1.125rem]"
            >
              {projects.map((p, i) => {
                // ponytail: the fourth card is the wide one; revisit the grid if the featured count changes.
                const wide = i === 3;
                return (
                  <li key={p.slug} className={wide ? "lg:col-span-2" : undefined}>
                    <ProjectCard project={p} wide={wide} locale={locale} />
                  </li>
                );
              })}
            </ul>

            {/* beside 004 from 1024px: the live instrument panel on top, the CTA pinned to the bottom */}
            <div
              data-reveal
              className="flex flex-col gap-10 pt-4 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:gap-8 lg:pt-0"
            >
              <Telemetry />
              <div className="flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between lg:mt-auto lg:flex-col lg:items-center">
                <Link
                  href={localePath(locale, "/work")}
                  data-magnetic="0.25"
                  className="group/cta inline-flex h-14 items-center justify-center bg-accent px-9 font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-on-accent transition-colors duration-300 hover:bg-accent-deep md:h-[3.25rem]"
                >
                  {/* the label rolls up and its copy takes the place */}
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover/cta:-translate-y-full">
                      {t.cta}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out)] group-hover/cta:translate-y-0"
                    >
                      {t.cta}
                    </span>
                  </span>
                </Link>
                <p className="t-label tabular lg:text-center">{t.index(pad(projects.length), archive.length)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
