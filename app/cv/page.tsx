import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { education, experience, profile, skills } from "@/lib/data";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

const COPY = {
  title: "CV",
  description:
    "Résumé of Pedro Tortoriello, software engineer in full stack development and automation: experience, selected projects, skills and education.",
  label: "Résumé · English · A4",
  download: "Download PDF",
  summary: "Summary",
  experience: "Experience",
  projects: "Selected projects",
  skills: "Skills",
  education: "Education",
  stack: "Stack",
  usTeam: "US-based team",
  shipsAs: "Ships as",
  caseStudy: "Case study",
  location: "São Paulo, Brazil · remote",
} as const;

export const metadata: Metadata = {
  title: COPY.title,
  description: COPY.description,
  alternates: { canonical: "/cv" },
  // the PDF is the document people share; this page is its source
  robots: { index: false, follow: true },
};

// Paper: A4, the site's chrome (and the dev overlay) left out, paper colours, nothing caught mid-fade.
// A raw string: React would escape the ">" combinator in a text child.
// color-scheme too: under the site's dark scheme Chrome paints the page margins dark.
const PRINT = `@page { size: A4; margin: 14mm 16mm; }
@media print {
  html, body { background: #fff !important; color: #000 !important; color-scheme: light !important; }
  body > :not(main), body :is(header, footer, nav):not([data-cv] *) { display: none !important; }
  main, main * { animation: none !important; transition: none !important; }
}`;

// Static font files: Chrome embeds a variable font in a PDF as Type 3 glyphs, which some ATS
// parsers read poorly, and Google serves Inter Tight as variable whatever weights are asked for.
// The geist package ships static cuts, so the document is set in Geist and Geist Mono.
const sans = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2", weight: "400" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2", weight: "500" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2", weight: "700" },
  ],
});
const mono = localFont({ src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2", variable: "--font-mono" });

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Hyphenated words never break across lines: PDF readers rejoin "co-" + "developer" as "codeveloper".
const keep = (text: string) =>
  text.split(/(\S*\w-\w\S*)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );

// The résumé, generated from lib/data.ts and lib/projects.ts. One column, real text,
// standard headings and no letter-spaced print text (PDF readers split it into letters),
// so ATS parsers read it as written. On screen it is a dark document; printed, black on white.
// scripts/cv-pdf.mjs prints it to public/cv-pedro-tortoriello-en.pdf.
export default function CvPage() {
  // A local server has no public address to print; the case links need the real domain.
  const site = SITE_URL.includes("localhost") ? null : SITE_URL;
  const contact = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: host(profile.linkedin), href: profile.linkedin },
    { label: host(profile.github), href: profile.github },
    ...(site ? [{ label: host(site), href: site }] : []),
  ];

  return (
    <div className="container-x pb-[clamp(8rem,14vw,12rem)] pt-[calc(var(--header-h)+clamp(2rem,6vw,5rem))] print:p-0">
      <style dangerouslySetInnerHTML={{ __html: PRINT }} />
      <div className="mx-auto max-w-[52rem]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 print:hidden">
          <p className="t-label t-bracket">{COPY.label}</p>
          <a
            href={profile.cv}
            download
            className="group inline-flex h-11 items-center gap-2.5 border border-line-strong px-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {COPY.download}
            <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        <article
          data-cv
          className={`${sans.className} ${mono.variable} mt-12 text-[0.9375rem] leading-[1.6] text-ink-muted print:mt-0 print:text-[9.5pt] print:leading-[1.45] print:text-[#333]`}
        >
          <header>
            {/* in print the word gap is widened: under tight caps PDF readers lose the space ("PEDROTORTORIELLO") */}
            <h1 className="text-[clamp(2.5rem,8vw,4.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-ink print:text-[25pt] print:tracking-normal print:text-black print:[word-spacing:0.15em]">
              {profile.name}
            </h1>
            <p className="mt-4 text-[1.125rem] font-medium leading-snug text-ink print:mt-[2mm] print:text-[11.5pt] print:text-black">
              {profile.role} — {profile.focus}
            </p>
            <address className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8125rem] not-italic print:mt-[2mm] print:gap-x-[4mm] print:text-[8.5pt]">
              {contact.map((c) => (
                <a key={c.href} href={c.href} className="transition-colors hover:text-accent print:text-[#333]">
                  {c.label}
                </a>
              ))}
              <span>{COPY.location}</span>
            </address>
          </header>

          <Section title={COPY.summary}>
            <p className="text-pretty text-ink print:text-black">{keep(profile.summary)}</p>
          </Section>

          <Section title={COPY.experience}>
            {experience.map((e) => (
              <Entry
                key={e.id}
                title={`${e.role} — ${e.company}`}
                when={e.period}
                meta={[e.place, e.usTeam ? COPY.usTeam : null]}
                stack={e.tech}
              >
                {e.summary ? <p className="mt-1.5 text-pretty print:mt-[1mm]">{keep(e.summary)}</p> : null}
              </Entry>
            ))}
          </Section>

          <Section title={COPY.projects}>
            {projects.map((p) => (
              <Entry
                key={p.slug}
                title={`${p.title} — ${p.category}`}
                when={p.year}
                meta={[p.role, p.product ? `${COPY.shipsAs} ${p.product}` : null, p.status]}
                stack={p.stack.slice(0, 8)}
              >
                <p className="mt-1.5 text-pretty print:mt-[1mm]">{keep(p.note ? `${p.summary} ${p.note}` : p.summary)}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 font-mono text-[0.8125rem] print:text-[8.5pt]">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} className="transition-colors hover:text-accent print:text-[#333]">
                      {l.label}
                    </a>
                  ))}
                  {site ? (
                    <a href={`${site}/work/${p.slug}`} className="transition-colors hover:text-accent print:text-[#333]">
                      {COPY.caseStudy}: {host(site)}/work/{p.slug}
                    </a>
                  ) : null}
                </p>
              </Entry>
            ))}
          </Section>

          <Section title={COPY.skills}>
            <dl className="grid grid-cols-[minmax(0,9.5rem)_1fr] gap-x-6 gap-y-1.5 print:grid-cols-[32mm_1fr] print:gap-y-[1mm]">
              {skills.map((g) => (
                <div key={g.title} className="contents">
                  <dt className="font-medium text-ink print:text-black">{g.title}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={COPY.education}>
            <p>
              <span className="font-medium text-ink print:text-black">{education.course}</span> — {education.school},{" "}
              {education.place.replace(" · ", ", ")}
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 print:mt-[5mm]">
      <h2 className="t-label break-after-avoid border-b border-line pb-2 print:border-black/30 print:pb-[1mm] print:text-[8pt] print:tracking-[0.05em] print:text-[#555]">
        {title}
      </h2>
      <div className="mt-5 space-y-7 print:mt-[2.5mm] print:space-y-[3.5mm]">{children}</div>
    </section>
  );
}

type EntryProps = {
  title: string;
  when: string;
  meta: (string | null)[];
  stack?: readonly string[];
  children: ReactNode;
};

// One role or project: title and dates on a line, then where and how, the text and the stack.
function Entry({ title, when, meta, stack, children }: EntryProps) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
        <h3 className="font-bold text-ink print:text-[10pt] print:text-black">{title}</h3>
        <p className="tabular font-mono text-[0.8125rem] print:text-[8.5pt]">{when}</p>
      </div>
      <p className="mt-0.5 font-mono text-[0.8125rem] print:text-[8.5pt]">{keep(meta.filter(Boolean).join(" · "))}</p>
      {children}
      {stack?.length ? (
        <p className="mt-1.5 print:mt-[1mm]">
          <span className="text-ink print:text-black">{COPY.stack}:</span> {keep(stack.join(", "))}
        </p>
      ) : null}
    </div>
  );
}
