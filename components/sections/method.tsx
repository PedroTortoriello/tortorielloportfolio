import { SectionHeader } from "@/components/ui/section-header";
import { Window } from "@/components/ui/window";
import { buildDemo, method } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const principles = [
  ["Separação de responsabilidades", "Cada camada com um motivo para mudar."],
  ["APIs e contratos bem definidos", "O mesmo schema para quem chama e para quem responde."],
  ["Integração entre serviços", "Origem validada, reentrega tratada, saída centralizada."],
  ["Automação de processos", "Workers, crons e eventos no lugar de tarefas manuais."],
  ["Tratamento de erros", "Backoff, dead letter queue, idempotência. Nada de falso sucesso."],
  ["Manutenibilidade", "Refatoração contínua, code review e limites documentados."],
  ["Performance e escala", "Quando o problema pede: SKIP LOCKED, balanceamento, pré-renderização."],
] as const;

export function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="section-y relative border-t border-line-faint">
      <div className="container-x">
        <SectionHeader
          id="metodo-title"
          index="04"
          label="How I engineer software"
          meta="pipeline · 5 estágios"
          statement="Raciocínio de engenharia, com a prova de onde ele aparece."
          lead="Cada estágio aponta um projeto em que a decisão está no código. Sem palavras de efeito: só o que dá para conferir."
        />

        {/* pipeline */}
        <ol data-reveal className="grid-cols-1 relative mt-16 grid gap-0 lg:mt-24 lg:grid-cols-5 lg:gap-6">
          {/* desktop track */}
          <span aria-hidden className="pointer-events-none absolute left-[1.1rem] right-[calc(20%-1.1rem)] top-[1.1rem] hidden lg:block">
            <span className="conn relative block h-px w-full">
              <span className="conn-line absolute inset-0 bg-line-strong" />
              <span className="conn-dot conn-h absolute size-1 rounded-full bg-cyan [animation-duration:4.5s]" />
            </span>
          </span>
          {method.map((s, i) => (
            <li key={s.id} className="relative grid grid-cols-[2.2rem_1fr] gap-4 pb-10 last:pb-0 lg:block lg:pb-0" style={d(i * 90)}>
              {/* mobile rail */}
              {i < method.length - 1 ? <span aria-hidden className="absolute bottom-0 left-[1.1rem] top-[2.2rem] w-px bg-line-strong lg:hidden" /> : null}
              <span aria-hidden className="relative z-10 grid size-[2.2rem] place-items-center rounded-lg border border-blue/50 bg-surface shadow-[0_0_0_4px_var(--color-bg)]">
                <span className="size-2 rounded-[3px] bg-blue" />
              </span>
              <div className="lg:mt-6">
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink">{s.title}</h3>
                <p className="mt-1 font-mono text-[0.68rem] text-ink-faint tabular">
                  stage {String(i + 1).padStart(2, "0")} · {s.verb.toLowerCase()}
                </p>
                <p className="mt-3 text-pretty text-[0.92rem] leading-7 text-ink-muted">{s.text}</p>
                <div className="mt-4 rounded-lg border border-line bg-surface/60 p-3.5">
                  <p className="font-mono text-[0.66rem] text-blue">↳ {s.evidence.project}</p>
                  <p className="mt-1.5 text-pretty text-[0.82rem] leading-6 text-ink">{s.evidence.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid-cols-1 mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label">princípios que atravessam os estágios</p>
            <dl className="mt-5 border-t border-line">
              {principles.map(([k, v], i) => (
                <div key={k} data-reveal style={d(i * 50)} className="grid-cols-1 grid gap-1 border-b border-line py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
                  <dt className="text-[0.95rem] font-medium text-ink">{k}</dt>
                  <dd className="text-[0.9rem] leading-6 text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5" data-reveal style={d(150)}>
            <Window
              label="Console de build ilustrativo"
              title={
                <>
                  <span className="text-ink-faint">~/projeto —</span> deliver
                </>
              }
              meta="demonstração"
              status={
                <>
                  <span>ilustrativo · não é um build ao vivo</span>
                </>
              }
              bodyClassName="px-5 py-5"
            >
              <div className="font-mono text-[0.78rem] leading-[1.9]">
                {buildDemo.map((l, i) => (
                  <p key={i} className="build-line whitespace-pre" style={d(300 + i * 220)}>
                    {l.kind === "cmd" ? (
                      <>
                        <span className="text-ink-faint">$ </span>
                        <span className="text-ink">{l.text}</span>
                      </>
                    ) : l.kind === "ok" ? (
                      <>
                        <span className="text-green">✓ </span>
                        <span className="text-ink-muted">{l.text}</span>
                      </>
                    ) : (
                      <span className="text-ink-faint">{l.text}</span>
                    )}
                  </p>
                ))}
              </div>
            </Window>
          </div>
        </div>
      </div>
    </section>
  );
}
