import type { CSSProperties } from "react";
import { SkillsHead } from "@/components/skills/skills-head";
import { content, type Locale } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

// Tech names stay as they are; on the Portuguese page only the descriptive items change
// (the skills wall here, the experience ledger's stack tags too).
const PT_ITEMS: Record<string, string> = {
  "System Architecture": "Arquitetura de Sistemas",
  Microservices: "Microsserviços",
  "AI Agents": "Agentes de IA",
  "AI Integrations": "Integrações de IA",
  "Workflow Engineering": "Engenharia de Workflows",
  "Database Design": "Modelagem de Dados",
  "REST APIs": "APIs REST",
  AI: "IA",
};
export const stackLabel = (locale: Locale, item: string) => (locale === "pt" && PT_ITEMS[item]) || item;

// The skills wall (reference 3): an enormous "SKILLS." on pure black, a long
// silence, then four stencil-headed columns (2×2 from 480px, one below).
// Violet marks only the period, the headers, their hairlines and the item
// hover; the mono labels index the stack.
export function Skills({ locale = "en" }: { locale?: Locale }) {
  const { skills } = content(locale);
  // Module numbers run end to end across the groups: 01—06, 07—12, …
  const groups = skills.map((g, i) => {
    const from = skills.slice(0, i).reduce((n, s) => n + s.items.length, 1);
    return { ...g, from, to: from + g.items.length - 1 };
  });

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y bg-bg pb-[clamp(9rem,12vw,12rem)]">
      <div className="container-x">
        <SkillsHead id="skills-title" counts={skills.map((g) => g.items.length)} />

        <ol
          role="list"
          className="mt-[clamp(6rem,13vw,13rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-20 min-[480px]:grid-cols-2 min-[480px]:gap-y-16 xl:grid-cols-4"
        >
          {groups.map((g, i) => (
            // Each column is a size container: the header scales with it so
            // "AUTOMATION & AI" (6.73em) always holds one line.
            <li key={g.index} className="@container" style={{ "--d": `${i * 90}ms` } as CSSProperties}>
              <h3 data-mask className="font-stencil font-extrabold uppercase text-violet">
                <span aria-hidden className="flex items-baseline justify-between gap-4">
                  <span className="text-lg leading-none tracking-[0.04em] text-violet-soft">{g.index} —</span>
                  <span className="t-label font-normal">
                    MOD {pad(g.from)}—{pad(g.to)}
                  </span>
                </span>
                <span className="mt-3 block text-[clamp(1.75rem,13.5cqi,2.75rem)] leading-[0.9]">{g.title}</span>
              </h3>
              <span aria-hidden data-reveal="rule" className="mt-5 block h-px bg-violet" />

              <ul role="list" data-stagger className="mt-6 font-tech text-lg leading-[1.75] text-ink">
                {g.items.map((item) => (
                  <li key={item} className="group/item relative w-fit">
                    {/* Hover: a violet square slides in from the margin, the text steps 6px. */}
                    <span
                      aria-hidden
                      className="absolute -left-2 top-1/2 size-1.5 -translate-x-1.5 -translate-y-1/2 bg-violet opacity-0 transition-[translate,opacity] duration-300 ease-[var(--ease-out)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    />
                    <span className="inline-block transition-[translate] duration-300 ease-[var(--ease-out)] group-hover/item:translate-x-1.5">
                      {stackLabel(locale, item)}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
