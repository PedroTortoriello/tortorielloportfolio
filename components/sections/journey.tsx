import { ChevronDown, FileText, GraduationCap, Languages } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { education, experience, profile } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Two parallel lanes, like a git graph: products/freelance runs from 2021 to
// today; company roles run beside it.
function Gutter({ lane, first, lastCompany, firstCompany }: { lane: "products" | "company"; first: boolean; firstCompany: boolean; lastCompany: boolean }) {
  return (
    <div aria-hidden className="relative w-12 shrink-0 self-stretch">
      {/* products lane: continuous */}
      <span className={`absolute left-[11px] w-px bg-blue/45 ${first ? "top-[1.6rem]" : "top-0"} bottom-0`} />
      {/* company lane */}
      {lane === "company" ? (
        <span className={`absolute left-[35px] w-px bg-line-strong ${firstCompany ? "top-[1.6rem]" : "top-0"} ${lastCompany ? "h-[1.6rem]" : "bottom-0"}`} />
      ) : null}
      {lane === "products" ? (
        <span className="absolute left-[5px] top-[1.25rem] grid size-[13px] place-items-center rounded-full border border-blue bg-bg">
          <span className="size-[5px] rounded-full bg-blue" />
        </span>
      ) : (
        <span className="absolute left-[30px] top-[1.3rem] size-[11px] rounded-full border border-ink-muted bg-bg transition-colors duration-300 group-open:border-blue group-open:bg-blue/30" />
      )}
      {firstCompany ? <span className="absolute left-[11px] top-[1.6rem] h-px w-6 bg-line-strong" /> : null}
    </div>
  );
}

export function Journey() {
  const companies = experience.filter((e) => e.lane === "company");
  return (
    <section id="jornada" aria-labelledby="jornada-title" className="section-y relative border-t border-line-faint">
      <div className="container-x">
        <SectionHeader
          id="jornada-title"
          index="02"
          label="Engineering journey"
          meta={`${profile.since} — hoje`}
          statement="Da interface ao sistema inteiro, em times remotos no Brasil e para uma empresa dos EUA."
          lead="O registro vem do meu currículo: empresas, períodos e o que eu fiz em cada uma. Abra uma entrada para ver os detalhes técnicos."
        />

        <div className="grid-cols-1 mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-5 pb-4 pl-1 font-mono text-[0.68rem] text-ink-faint" aria-hidden>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue" />
                produtos e freelance
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full border border-ink-muted" />
                empresas
              </span>
            </div>

            <div className="border-t border-line">
              {experience.map((e, i) => {
                const ci = companies.indexOf(e);
                return (
                  <details
                    key={e.id}
                    name="journey"
                    open={i === 0}
                    data-reveal
                    style={d(i * 70)}
                    className="journey group border-b border-line"
                  >
                    <summary className="flex cursor-pointer list-none items-stretch gap-2 outline-none [&::-webkit-details-marker]:hidden focus-visible:bg-surface/60">
                      <Gutter lane={e.lane} first={i === 0} firstCompany={ci === 0} lastCompany={ci === companies.length - 1} />
                      <div className="grid-cols-1 grid min-w-0 flex-1 gap-1 py-5 pr-2 sm:grid-cols-[9.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                        <p className="font-mono text-[0.72rem] text-ink-faint tabular">
                          {e.period}
                          {e.current ? <span className="ml-2 rounded border border-blue/50 px-1.5 py-px text-[0.6rem] text-blue">HEAD</span> : null}
                        </p>
                        <div className="min-w-0">
                          <p className="text-lg font-medium leading-snug text-ink transition-colors group-hover:text-white">{e.company}</p>
                          <p className="mt-0.5 text-sm text-ink-muted">
                            {e.role} <span className="text-ink-faint">· {e.place}</span>
                          </p>
                        </div>
                        <ChevronDown aria-hidden className="hidden size-4 text-ink-faint transition-transform duration-300 group-open:rotate-180 sm:block" />
                      </div>
                    </summary>
                    <div className="flex gap-2 pb-7">
                      <div aria-hidden className="relative w-12 shrink-0">
                        <span className="absolute bottom-0 left-[11px] top-0 w-px bg-blue/45" />
                        {e.lane === "company" && ci < companies.length - 1 ? <span className="absolute bottom-0 left-[35px] top-0 w-px bg-line-strong" /> : null}
                      </div>
                      <div className="min-w-0 flex-1 pr-2 sm:pl-[calc(9.5rem+1.5rem)]">
                        <p className="max-w-2xl text-pretty text-[0.95rem] leading-7 text-ink-muted">{e.summary}</p>
                        <ul className="mt-4 grid max-w-2xl gap-2.5">
                          {e.details.map((t) => (
                            <li key={t} className="grid grid-cols-[1rem_1fr] gap-2 text-[0.9rem] leading-6 text-ink">
                              <span aria-hidden className="mt-[0.6rem] h-px w-2.5 bg-blue" />
                              {t}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                          <div>
                            <p className="label">sistemas</p>
                            <p className="mt-1.5 text-[0.82rem] text-ink-muted">{e.systems.join(" · ")}</p>
                          </div>
                          <div>
                            <p className="label">tecnologias</p>
                            <p className="mt-1.5 font-mono text-[0.72rem] text-ink-muted">{e.tech.join(" · ")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                );
              })}
              <div className="flex items-center gap-2 py-5" data-reveal>
                <div aria-hidden className="relative h-6 w-12 shrink-0">
                  <span className="absolute left-[11px] top-0 h-3 w-px bg-blue/45" />
                  <span className="absolute left-[7px] top-3 size-[9px] rotate-45 border border-blue/70 bg-bg" />
                </div>
                <p className="font-mono text-[0.72rem] text-ink-faint">
                  <span className="text-ink-muted">{profile.since}</span> · início da atuação como desenvolvedor
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4" aria-label="Formação e idiomas">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:sticky lg:top-24">
              <div className="bg-surface p-6">
                <p className="label flex items-center gap-2">
                  <GraduationCap aria-hidden className="size-3.5" strokeWidth={1.6} /> formação
                </p>
                <p className="mt-3 font-medium leading-snug text-ink">{education.course}</p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {education.school} · {education.place}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-green">
                  <span className="size-1.5 rounded-full bg-green" /> {education.status.toLowerCase()}
                </p>
              </div>
              <div className="bg-surface p-6">
                <p className="label flex items-center gap-2">
                  <Languages aria-hidden className="size-3.5" strokeWidth={1.6} /> idiomas
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{education.languages}</p>
              </div>
              <div className="bg-surface p-6">
                <p className="label">práticas de engenharia</p>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  Git e GitHub, code review, Scrum e Kanban, documentação técnica e colaboração em time remoto e distribuído.
                </p>
                <Button href={profile.cv} external variant="secondary" className="mt-5 w-full" icon={<FileText aria-hidden className="size-4 text-ink-muted" />}>
                  Currículo completo (PDF)
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
