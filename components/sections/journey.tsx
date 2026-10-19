import { Check, ChevronDown, FileText, GitBranch, GraduationCap, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Console, LiveDot } from "@/components/ui/console";
import { SectionHeader } from "@/components/ui/section-header";
import { education, experience, profile, type Experience } from "@/lib/data";

const lanes = { products: "produtos e freelance", company: "empresas" } as const;

// V1's sentence, split into its items.
const practices = ["Git e GitHub", "code review", "Scrum e Kanban", "documentação técnica", "colaboração em time remoto e distribuído"];

// "Português nativo" → ["Português", "nativo"]: language and level as a readout.
const languages = education.languages.split(" · ").map((l) => [l.slice(0, l.indexOf(" ")), l.slice(l.indexOf(" ") + 1)]);

// Lanes read by shape, not by colour: a ringed circle for products and
// freelance, a hollow square for companies (it lights while its entry is open).
// The 4px ring of field colour cuts the mission line around each node.
function Node({ lane }: { lane: Experience["lane"] }) {
  return lane === "products" ? (
    <span className="relative grid size-[13px] place-items-center rounded-full border border-blue bg-bg shadow-[0_0_0_4px_var(--color-bg)]">
      <span className="size-[5px] rounded-full bg-blue" />
    </span>
  ) : (
    <span className="relative block size-[11px] rounded-[2px] border border-ink-muted bg-bg shadow-[0_0_0_4px_var(--color-bg)] transition-colors duration-300 group-has-[details[open]]/entry:border-blue group-has-[details[open]]/entry:bg-blue/25" />
  );
}

// The period as written in the CV; on the current entry "atual" is the live state.
function Period({ e }: { e: Experience }) {
  const [from, to] = e.period.split(" — ");
  if (!e.current || !to) return e.period;
  return (
    <>
      {from} —{" "}
      <LiveDot>
        <span className="text-blue">{to}</span>
      </LiveDot>
    </>
  );
}

// Section 02 — the mission log. One line runs from the present (top) down to the
// first entry of the career; it draws with the scroll over a structural track.
// Every entry is a fact from lib/data.ts; technical detail opens on demand.
export function Journey() {
  return (
    <section
      id="jornada"
      data-station="02"
      data-station-label="Experiência"
      aria-labelledby="jornada-title"
      className="section-y relative border-t border-line-faint"
    >
      <div className="container-x">
        <SectionHeader
          id="jornada-title"
          index="02"
          label="Experiência"
          meta={`${profile.since} — hoje`}
          statement="Da interface ao sistema inteiro, em times remotos no Brasil e para uma empresa dos EUA."
          lead="O registro vem do meu currículo: empresas, períodos e o que eu fiz em cada uma. Abra uma entrada para ver os detalhes técnicos."
        />

        {/* fixed 20rem aside from lg: the console and its button need the width at 1024px */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            {/* legend: the node shapes, named (screen readers get the lane per entry) */}
            <ul aria-hidden className="mb-10 flex flex-wrap gap-x-6 gap-y-2 pl-10 font-mono text-[0.8125rem] text-ink-faint md:pl-14">
              {(["products", "company"] as const).map((lane) => (
                <li key={lane} className="inline-flex items-center gap-2.5">
                  <span className="grid size-[13px] place-items-center">
                    <Node lane={lane} />
                  </span>
                  {lanes[lane]}
                </li>
              ))}
            </ul>

            <div data-draw="scrub" className="relative">
              <div className="relative">
                {/* track: overshoots above the present, since the current entry is still running */}
                <span
                  aria-hidden
                  className="absolute -bottom-[10px] -top-8 left-[12px] w-px bg-[linear-gradient(to_bottom,transparent,var(--color-line-strong)_2rem)]"
                />
                {/* mission line: first node → mission start (viewBox units keep its length fixed when entries open) */}
                <span aria-hidden className="absolute -bottom-[10px] left-[12px] top-[10px] w-px md:top-[17px]">
                  <svg viewBox="0 0 1 100" preserveAspectRatio="none" className="block size-full">
                    <defs>
                      <linearGradient id="journey-line" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style={{ stopColor: "var(--color-blue-bright)" }} />
                        <stop offset="0.3" style={{ stopColor: "var(--color-blue)" }} />
                        <stop offset="1" style={{ stopColor: "var(--color-blue)", stopOpacity: 0.55 }} />
                      </linearGradient>
                    </defs>
                    <line className="draw" x1="0.5" y1="0" x2="0.5" y2="100" stroke="url(#journey-line)" strokeWidth="1" />
                  </svg>
                </span>

                <ol>
                  {experience.map((e, i) => (
                    <li
                      key={e.id}
                      className="group/entry relative grid grid-cols-1 gap-y-3 pb-14 pl-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-8 md:pb-16 md:pl-14"
                    >
                      {/* node: on the period line on mobile, on the company line from md */}
                      <span aria-hidden className="absolute left-[6px] top-[3.5px] grid size-[13px] place-items-center md:top-[10.75px]">
                        {e.current ? (
                          <span className="motion-only absolute inset-0 rounded-full bg-blue/50 animate-[ping-soft_2.6s_ease-out_infinite]" />
                        ) : null}
                        <Node lane={e.lane} />
                      </span>

                      <p className="font-mono text-[0.8125rem] leading-5 text-ink-faint tabular md:pt-[7px]">
                        <Period e={e} />
                        <span className="sr-only"> · {lanes[e.lane]}</span>
                      </p>

                      <div className="min-w-0">
                        <h3 className="text-balance text-[1.5rem] font-medium leading-[1.15] tracking-[-0.025em] text-ink md:text-[1.875rem]">
                          {e.company}
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-6 text-ink-muted">
                          {e.role} <span className="text-ink-faint">· {e.place}</span>
                        </p>
                        <p className="mt-4 max-w-[40rem] text-pretty text-base leading-7 text-ink-muted">{e.summary}</p>

                        <details name="journey" open={i === 0} className="journey group mt-3">
                          <summary className="-ml-2 inline-flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-[5px] px-2 text-[0.875rem] font-medium text-ink-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden [&:hover>svg]:text-blue">
                            Detalhes técnicos
                            <span className="sr-only"> — {e.company}</span>
                            <ChevronDown
                              aria-hidden
                              strokeWidth={1.75}
                              className="size-4 text-ink-faint transition-[transform,color] duration-300 group-open:rotate-180"
                            />
                          </summary>
                          <div className="pb-1 pt-4">
                            <ul className="grid max-w-[40rem] gap-3">
                              {e.details.map((t) => (
                                <li key={t} className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-[0.9375rem] leading-6 text-ink">
                                  <span aria-hidden className="mt-3 h-px w-2.5 bg-blue" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                            <dl className="mt-6 grid max-w-[40rem] gap-5 border-t border-line-faint pt-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-5 xl:grid-cols-2 xl:gap-8">
                              <div>
                                <dt className="label">sistemas</dt>
                                <dd className="mt-2.5 text-[0.875rem] leading-6 text-ink-muted">{e.systems.join(" · ")}</dd>
                              </div>
                              <div>
                                <dt className="label">tecnologias</dt>
                                <dd className="mt-2.5">
                                  <ul className="flex flex-wrap gap-1.5">
                                    {e.tech.map((t) => (
                                      <li
                                        key={t}
                                        className="rounded-[5px] border border-line px-2 py-0.5 font-mono text-[0.8125rem] leading-5 text-ink-muted"
                                      >
                                        {t}
                                      </li>
                                    ))}
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </details>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* mission start: the line ends on this mark (centre 10px from the top) */}
              <div className="relative grid grid-cols-1 gap-y-1 pl-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-8 md:pl-14">
                <span aria-hidden className="absolute left-[8px] top-[5.5px] size-[9px] rotate-45 border border-blue bg-bg shadow-[0_0_0_4px_var(--color-bg)]" />
                <p className="font-mono text-[0.8125rem] leading-5 text-ink-muted tabular">{profile.since}</p>
                <p className="text-[0.9375rem] leading-5 text-ink-muted">início da atuação como desenvolvedor</p>
              </div>
            </div>
          </div>

          <aside aria-label="Formação, idiomas e práticas de engenharia">
            <div data-power className="lg:sticky lg:top-24">
              {/* one console, hairline-divided: a 2×2 grid while it sits under the list, one column beside it */}
              <Console label="formação · idiomas · práticas" bodyClassName="grid md:grid-cols-2 lg:grid-cols-1">
                <div className="p-5 sm:p-6">
                  <h3 className="label flex items-center gap-2">
                    <GraduationCap aria-hidden className="size-3.5" strokeWidth={1.6} /> formação
                  </h3>
                  <p className="mt-3 text-[1.0625rem] font-medium leading-snug text-ink">{education.course}</p>
                  <p className="mt-1.5 text-sm leading-6 text-ink-muted">
                    {education.school} · {education.place}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.8125rem] text-blue">
                    <Check aria-hidden className="size-3.5" strokeWidth={2} /> {education.status.toLowerCase()}
                  </p>
                </div>

                <div className="border-t border-line p-5 sm:p-6 md:border-l md:border-t-0 lg:border-l-0 lg:border-t">
                  <h3 className="label flex items-center gap-2">
                    <Languages aria-hidden className="size-3.5" strokeWidth={1.6} /> idiomas
                  </h3>
                  <dl className="mt-4 grid gap-2.5">
                    {languages.map(([lang, level]) => (
                      <div key={lang} className="flex items-baseline gap-3">
                        <dt className="flex flex-1 items-baseline gap-3 text-[0.9375rem] text-ink after:flex-1 after:border-b after:border-dashed after:border-line after:content-['']">
                          {lang}
                        </dt>
                        <dd className="font-mono text-[0.8125rem] text-ink-muted">{level}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="border-t border-line p-5 sm:p-6">
                  <h3 className="label flex items-center gap-2">
                    <GitBranch aria-hidden className="size-3.5" strokeWidth={1.6} /> práticas de engenharia
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {practices.map((p) => (
                      <li key={p} className="rounded-[5px] border border-line px-2.5 py-1 text-[0.8125rem] leading-5 text-ink-muted">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center border-t border-line p-5 sm:p-6 md:border-l lg:border-l-0">
                  <Button
                    href={profile.cv}
                    external
                    variant="secondary"
                    className="w-full"
                    icon={<FileText aria-hidden className="size-4 text-ink-muted" />}
                  >
                    Currículo completo (PDF)
                  </Button>
                </div>
              </Console>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
