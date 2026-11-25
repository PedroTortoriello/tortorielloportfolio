import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HTML_LANG, OG_LOCALE, content, localePath, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { Architecture } from "./architecture";
import { CaseSection, Challenges, Decisions, Implementation, Results, Spec, Tags } from "./case-blocks";
import { CaseHero } from "./case-hero";
import { CaseNav } from "./case-nav";
import { CaseRecord } from "./case-record";
import { NextCase } from "./next-case";

// The chapters every case has, in order; the index and the headings share them.
const COPY = {
  en: {
    overview: "Overview",
    problem: "Problem",
    architecture: "Architecture",
    decisions: "Technical decisions",
    challenges: "Challenges",
    implementation: "Implementation",
    technologies: "Technologies",
    results: "Results",
  },
  pt: {
    overview: "Visão geral",
    problem: "Problema",
    architecture: "Arquitetura",
    decisions: "Decisões técnicas",
    challenges: "Desafios",
    implementation: "Implementação",
    technologies: "Tecnologias",
    results: "Resultados",
  },
} as const;

type Chapter = keyof (typeof COPY)["en"];
const CHAPTERS = Object.keys(COPY.en) as Chapter[];

// The co-authorship note goes wherever the project goes, link previews included.
const describe = (p: Project) => (p.note ? `${p.summary} ${p.note}` : p.summary);

// A case's metadata in a locale: /work/[slug] and /pt/work/[slug] each call it from their generateMetadata.
export function caseMetadata(locale: Locale, p: Project | undefined): Metadata {
  if (!p) return {};
  const url = localePath(locale, `/work/${p.slug}`);
  const { profile } = content(locale);
  return {
    title: p.title,
    description: describe(p),
    alternates: { canonical: url, languages: { en: `/work/${p.slug}`, "pt-BR": `/pt/work/${p.slug}` } },
    // Metadata merges shallowly: this replaces the layout's openGraph, so it restates the site fields.
    // No images key: the route's opengraph-image.tsx supplies the card, and twitter:image inherits it.
    openGraph: {
      type: "article",
      locale: OG_LOCALE[locale],
      siteName: profile.name,
      url,
      title: `${p.title} — ${profile.name}`,
      description: describe(p),
    },
  };
}

function chapters(p: Project, locale: Locale): Record<Chapter, ReactNode> {
  return {
    overview: (
      <>
        {/* the lead lights up word by word as it scrolls past; screen readers get it whole from the copy */}
        <p className="sr-only">{p.overview}</p>
        <p
          aria-hidden
          data-scrub-words
          className="max-w-[44ch] text-pretty font-geo text-[clamp(1.5rem,2.6vw,2.5rem)] font-light leading-[1.2] tracking-[-0.015em] text-ink"
        >
          {p.overview}
        </p>
        <Spec items={p.readouts} locale={locale} />
      </>
    ),
    problem: (
      <p data-reveal className="max-w-[58ch] text-pretty text-[clamp(1.125rem,1.55vw,1.375rem)] leading-[1.6] text-ink">
        {p.problem}
      </p>
    ),
    architecture: <Architecture project={p} locale={locale} />,
    decisions: <Decisions items={p.decisions} />,
    challenges: <Challenges items={p.challenges} locale={locale} />,
    implementation: <Implementation items={p.implementation} />,
    technologies: <Tags items={p.stack} />,
    results: <Results items={p.results} />,
  };
}

// A case study: the cover and title, who built what, then eight chapters
// beside a sticky index, and the next case as the way out. Both /work/[slug]
// and /pt/work/[slug] render it, with the project already in their locale.
export function CasePage({ project: p, locale = "en" }: { project: Project; locale?: Locale }) {
  const body = chapters(p, locale);
  const sections = CHAPTERS.map((id) => ({ id, label: COPY[locale][id] }));
  const { profile } = content(locale);
  // Only fields that are true for every case: Pedro contributed to all four (see the record for the split).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: describe(p),
    url: `${SITE_URL}${localePath(locale, `/work/${p.slug}`)}`,
    inLanguage: HTML_LANG[locale],
    image: `${SITE_URL}${p.cover.src}`,
    keywords: p.tags.join(", "),
    contributor: { "@type": "Person", name: profile.name, url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CaseHero project={p} locale={locale} />
      <CaseRecord project={p} locale={locale} />

      <div className="container-x pt-[clamp(3rem,7vw,6rem)] lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-3 xl:col-span-2">
          <CaseNav items={sections} index={p.index} title={p.title} />
        </div>
        <div className="min-w-0 lg:col-span-9 xl:col-span-10">
          {sections.map((s, i) => (
            <CaseSection key={s.id} id={s.id} n={String(i + 1).padStart(2, "0")} title={s.label}>
              {body[s.id]}
            </CaseSection>
          ))}
        </div>
      </div>

      <NextCase current={p} locale={locale} />
    </>
  );
}
