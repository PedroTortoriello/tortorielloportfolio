import type { CSSProperties } from "react";
import { TimeBridge } from "@/components/experience/time-bridge";
import { stackLabel } from "@/components/sections/skills";
import type { Experience as Entry } from "@/lib/data";
import { content, type Locale } from "@/lib/i18n";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const COPY = {
  en: {
    label: "Experience",
    title: ["Remote-first", "Engineering journey"],
    lead: "Since 2021: client work and my own products, then teams in Brazil and remote roles with US-based teams.",
    usTeam: "US-based team",
    current: "Current",
    stack: "Stack",
    education: "Education",
  },
  pt: {
    label: "Experiência",
    title: ["Remoto por padrão", "Trajetória na engenharia"],
    lead: "Desde 2021: trabalho para clientes e produtos próprios, depois equipes no Brasil e cargos remotos com equipes baseadas nos EUA.",
    usTeam: "Equipe nos EUA",
    current: "Atual",
    stack: "Tecnologias",
    education: "Formação",
  },
} as const;

// Grid placement shared by everything in the "who / what" column of a row.
const main = "md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-3";

// The journey, between the skills wall and the finale. A remote-first
// statement, the São Paulo ←→ California bridge, then the CV as an editorial
// ledger. From lg the header and every row share three zones: label / period,
// statement / company, note / place and stack.
export function Experience({ locale = "en" }: { locale?: Locale }) {
  const { education, experience } = content(locale);
  const t = COPY[locale];
  const [school] = education.school.split(" · ");

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y bg-bg">
      <div className="container-x">
        <header className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6">
          <p data-reveal className="t-label t-bracket hidden md:col-span-3 md:mt-1 md:block lg:col-span-2">
            {t.label}
          </p>
          {/* the slashes are drawn, so screen readers (and SplitText's label) skip them */}
          <h2
            id="experience-title"
            data-split="lines"
            className="text-[length:min(11.2vw,4.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] md:col-span-9 md:text-[length:6.3vw] lg:col-span-7 lg:text-[length:min(4.85vw,4.375rem)]"
          >
            <span className="text-ink before:content-['//'_/_'']">{t.title[0]}</span> <br />
            <span className="text-[#8a8a8a]">{t.title[1]}</span>
          </h2>
          <p
            data-reveal
            style={delay(200)}
            className="mt-7 max-w-[38ch] text-pretty text-base leading-[1.6] text-ink-muted md:col-span-9 md:col-start-4 md:mt-8 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-0 lg:self-end lg:text-[1.0625rem]"
          >
            {t.lead}
          </p>
        </header>

        <TimeBridge locale={locale} className="mt-16 md:mt-20 lg:mt-24" />

        <ol className="mt-16 md:mt-20 lg:mt-24">
          {experience.map((e) => (
            <Row key={e.id} e={e} locale={locale} />
          ))}
        </ol>

        <div aria-hidden data-reveal="rule" className="h-px bg-line-strong" />
        <div data-reveal className="grid grid-cols-1 gap-y-3 pt-8 md:grid-cols-12 md:gap-x-6 md:pt-10">
          <p className="t-label t-bracket md:col-span-3 md:pt-1 lg:col-span-2">{t.education}</p>
          <p className="text-pretty text-[0.9375rem] leading-[1.6] text-ink-muted md:col-span-9 md:text-base lg:col-span-10">
            <span className="text-ink">{education.course}</span> — {school} · {education.place.replace(" · ", ", ")}
          </p>
        </div>
      </div>
    </section>
  );
}

// One ledger row. Phones stack it (period, company, role, place, summary,
// stack); md puts the period in its own column; lg moves place and stack to
// the right zone. Hover (fine pointers only): the company slides and a lime
// marker lands in the gutter beside it; nothing is hidden behind it.
function Row({ e, locale }: { e: Entry; locale: Locale }) {
  const t = COPY[locale];
  return (
    <li className="group">
      <div aria-hidden data-reveal="rule" className="h-px bg-line-strong" />
      <div className="grid grid-cols-1 py-10 md:grid-cols-12 md:gap-x-6 md:py-12 lg:py-14">
        <p
          data-reveal
          className="whitespace-nowrap font-stencil text-[length:min(14.5vw,4rem)] font-medium uppercase leading-[0.86] text-ink-muted transition-colors duration-500 [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1px_currentColor] group-hover:text-ink md:col-span-3 md:row-span-5 md:mt-0.5 md:text-[length:7vw] lg:col-span-2 lg:row-span-3 lg:mt-1 lg:text-[length:min(4.7vw,4.375rem)]"
        >
          <Period period={e.period} />
        </p>

        <div className={`relative mt-6 text-[length:clamp(1.8rem,3.4vw,3.2rem)] md:mt-0 lg:row-start-1 ${main}`}>
          <span
            aria-hidden
            className="absolute -left-[0.32em] top-[0.375em] hidden size-[0.2em] scale-0 bg-accent transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-100 md:block"
          />
          {/* keeps "/ V Shred" from opening a line */}
          <h3
            data-split="lines"
            style={delay(80)}
            className="text-balance font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2"
          >
            {e.company.replace(" / ", " / ")}
          </h3>
        </div>

        <p
          data-reveal
          style={delay(160)}
          className={`mt-3 text-[1.0625rem] font-medium leading-snug text-ink md:text-lg lg:row-start-2 lg:mt-4 ${main}`}
        >
          {e.role}
        </p>

        <div
          data-reveal
          style={delay(200)}
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2.5 md:col-span-9 md:col-start-4 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start lg:pt-1"
        >
          <p className="t-label">{e.place}</p>
          {e.usTeam ? <p className="tag border-accent/60 text-accent">{t.usTeam}</p> : null}
          {e.current ? (
            <p className="t-label inline-flex items-center gap-2 text-accent">
              <span aria-hidden className="relative grid size-2 place-items-center">
                <span className="motion-only absolute inset-0 animate-[ping-soft_2.4s_ease-out_infinite] rounded-full bg-accent" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {t.current}
            </p>
          ) : null}
        </div>

        {e.summary ? (
          <p
            data-reveal
            style={delay(240)}
            className={`mt-5 max-w-[60ch] text-pretty text-[0.9375rem] leading-[1.7] text-ink-muted md:mt-6 md:text-base lg:row-start-3 ${main}`}
          >
            {e.summary}
          </p>
        ) : null}

        {e.tech?.length ? (
          <ul
            aria-label={t.stack}
            data-reveal
            style={delay(280)}
            className="mt-6 flex flex-wrap gap-2 md:col-span-9 md:col-start-4 lg:col-span-3 lg:col-start-10 lg:row-start-3"
          >
            {e.tech.map((item) => (
              <li key={item} className="tag">
                {stackLabel(locale, item)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

// "2025 — 2026" on one line on phones; from md the years stack on one left
// edge ("2025 —" over "2026").
function Period({ period }: { period: string }) {
  const [from, to] = period.split(" — ");
  if (!to) return from;
  return (
    <>
      <span className="md:block">{from} —</span> <span className="md:block">{to}</span>
    </>
  );
}
