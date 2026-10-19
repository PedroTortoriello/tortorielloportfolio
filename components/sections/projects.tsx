import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { CodeLines } from "@/components/ui/code";
import { Window } from "@/components/ui/window";
import { GithubIcon } from "@/components/ui/icons";
import { SystemGraph } from "@/components/diagrams/system-graph";
import { PixAnatomy } from "@/components/diagrams/pix-anatomy";
import { RequestFlow } from "@/components/diagrams/request-flow";
import { cadenceflow, moreProjects, noivar, nucleo, sdr, type Project } from "@/lib/projects";
import { pixAnatomy } from "@/lib/pix";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function CaseHead({ p }: { p: Project }) {
  return (
    <div data-reveal>
      <h3 className="text-[clamp(2.25rem,4.6vw,3.6rem)] font-medium leading-none tracking-[-0.045em] text-ink">{p.title}</h3>
      <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-ink-muted sm:text-xl">{p.tagline}</p>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] text-ink-faint">
        <span className="font-medium text-ink-muted">{p.kind}</span>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-ink-muted">{p.role}</span>
        <span className="tabular">{p.year}</span>
      </p>
    </div>
  );
}

function ProblemSolution({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <dl data-reveal style={d(80)} className={`grid gap-6 ${className}`}>
      <div>
        <dt className="label">Problema</dt>
        <dd className="mt-2.5 text-pretty text-[0.95rem] leading-7 text-ink-muted">{p.problem}</dd>
      </div>
      <div>
        <dt className="label">Solução</dt>
        <dd className="mt-2.5 text-pretty text-[0.95rem] leading-7 text-ink-muted">{p.solution}</dd>
      </div>
    </dl>
  );
}

function Contribution({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div data-reveal style={d(140)} className={className}>
      <p className="label">Minha contribuição técnica</p>
      <ul className="mt-3 grid gap-3">
        {p.contribution.map((c) => (
          <li key={c} className="grid grid-cols-[1rem_1fr] gap-2 text-pretty text-[0.95rem] leading-7 text-ink">
            <span aria-hidden className="mt-[0.7rem] size-1.5 rounded-[2px] bg-blue" />
            {c}
          </li>
        ))}
      </ul>
      {p.note ? (
        <p className="mt-5 flex gap-2.5 rounded-lg border border-line bg-surface/70 px-3.5 py-3 text-[0.82rem] leading-6 text-ink-muted">
          <Info aria-hidden className="mt-1 size-3.5 shrink-0 text-ink-faint" />
          {p.note}
        </p>
      ) : null}
    </div>
  );
}

function StackAndLinks({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div data-reveal style={d(200)} className={`flex flex-col gap-5 ${className}`}>
      <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
        {p.stack.map((s) => (
          <li key={s} className="rounded-md border border-line bg-surface/60 px-2 py-1 font-mono text-[0.68rem] text-ink-muted">
            {s}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {p.links.map((l) =>
          l.kind === "code" ? (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <GithubIcon className="size-4" />
              {l.label}
            </a>
          ) : (
            <TextLink key={l.href} href={l.href}>
              {l.label}
            </TextLink>
          ),
        )}
        {!p.links.some((l) => l.kind === "code") ? <span className="text-[0.75rem] text-ink-faint">código privado</span> : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 01 */
function CaseCadenceFlow() {
  const p = cadenceflow;
  return (
    <article aria-labelledby="case-cadenceflow">
      <span id="case-cadenceflow" className="sr-only">
        {p.title}
      </span>
      <div className="grid-cols-1 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <CaseHead p={p} />
          <ProblemSolution p={p} className="mt-10" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Contribution p={p} />
          <StackAndLinks p={p} className="mt-8" />
        </div>
      </div>

      <div className="edge-light relative mt-14 rounded-2xl border border-line bg-surface/50 px-4 pb-6 pt-8 sm:px-8 lg:mt-16 lg:px-10 lg:pt-10">
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <p className="hud">system architecture · cadenceflow</p>
          <p className="hud hidden sm:block">produção · 3 instâncias</p>
        </div>
        <SystemGraph
          graph={p.graph}
          title="Arquitetura do CadenceFlow"
          tiers={[
            { x: 70, name: "Cliente" },
            { x: 245, name: "Entrada · jobs" },
            { x: 440, name: "Núcleo" },
            { x: 640, name: "Serviços" },
            { x: 860, name: "Integrações" },
          ]}
        />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- 02 */
function CaseNoivar() {
  const p = noivar;
  const pix = pixAnatomy({ key: "123e4567-e89b-12d3-a456-426614174000", name: "HELENA E LUCAS", city: "SAO PAULO", amount: 150, txid: "NOIVAR01" });
  return (
    <article aria-labelledby="case-noivar">
      <span id="case-noivar" className="sr-only">
        {p.title}
      </span>
      <div className="grid-cols-1 grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* product + engine */}
        <div className="relative lg:col-span-7" data-reveal>
          <BrowserFrame url="noivar.vercel.app/modelo/jardim-romantico/helena-e-lucas" className="edge-light">
            <Image
              src="/projects/noivar/jardim-romantico-desktop.webp"
              alt="Modelo Jardim Romântico do Noivar: site de casamento de demonstração com o casal fictício Helena e Lucas"
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 680px, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
          <PhoneFrame className="absolute -bottom-10 -right-2 hidden w-[11.5rem] rotate-0 sm:block lg:-right-8">
            <Image
              src="/projects/noivar/presentes-pix.webp"
              alt="Tela de presente em dinheiro do Noivar, com valor e botão Gerar Pix"
              width={704}
              height={1070}
              sizes="184px"
              className="h-auto w-full"
            />
          </PhoneFrame>
          <p className="mt-4 text-[0.75rem] text-ink-faint sm:mt-14">Demo pública do produto, com casal fictício.</p>
        </div>

        <div className="lg:col-span-5">
          <CaseHead p={p} />
          <ProblemSolution p={p} className="mt-10" />
        </div>
      </div>

      <div className="grid-cols-1 mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Contribution p={p} />
          <StackAndLinks p={p} className="mt-8" />
        </div>
        <div className="lg:col-span-7" data-reveal style={d(120)}>
          <Window
            className="edge-light"
            title={
              <>
                <span className="text-ink-faint">noivar › src › lib ›</span> pix.ts
              </>
            }
            meta="buildPixPayload()"
            status={
              <>
                <span>dados fictícios</span>
                <span className="ml-auto">TLV · CRC16-CCITT</span>
              </>
            }
            bodyClassName="p-4 sm:p-5"
          >
            <PixAnatomy payload={pix.payload} segments={pix.segments} />
          </Window>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- 03 */
const claimBatch = `async function claimBatch(): Promise<ClaimedEvent[]> {
  return prisma.$queryRaw<ClaimedEvent[]>\`
    UPDATE "OutboxEvent"
    SET status = 'PROCESSING', "lockedAt" = now()
    WHERE id IN (
      SELECT id FROM "OutboxEvent"
      WHERE status = 'PENDING' AND "availableAt" <= now()
      ORDER BY "createdAt" ASC
      LIMIT \${BATCH}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, "organizationId", type, payload, attempts
  \`;
}`;

function CaseNucleo() {
  const p = nucleo;
  return (
    <article aria-labelledby="case-nucleo">
      <span id="case-nucleo" className="sr-only">
        {p.title}
      </span>
      <div className="grid-cols-1 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <CaseHead p={p} />
          <ProblemSolution p={p} className="mt-10" />
          <Contribution p={p} className="mt-10" />
          <StackAndLinks p={p} className="mt-8" />
        </div>
        <div className="flex flex-col gap-8 lg:col-span-7 lg:pl-6">
          <div className="edge-light rounded-2xl border border-line bg-surface/50 p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="hud">api integration · ciclo de uma requisição</p>
              <p className="hud hidden sm:block">module 03</p>
            </div>
            <RequestFlow />
          </div>
          <div data-reveal style={d(160)}>
            <Window
              className="edge-light"
              title={
                <>
                  <span className="text-ink-faint">apps › api › modules › automations ›</span> worker.ts
                </>
              }
              meta="TypeScript · SQL"
              status={
                <>
                  <span>trecho real · Núcleo</span>
                  <span className="ml-auto">outbox transacional</span>
                </>
              }
            >
              <CodeLines code={claimBatch} highlight={[10]} />
            </Window>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- 04 */
function CaseSdr() {
  const p = sdr;
  return (
    <article aria-labelledby="case-sdr">
      <span id="case-sdr" className="sr-only">
        {p.title}
      </span>
      <CaseHead p={p} />
      <div className="grid-cols-1 mt-10 grid gap-10 lg:grid-cols-12">
        <ProblemSolution p={p} className="lg:col-span-5" />
        <Contribution p={p} className="lg:col-span-6 lg:col-start-7" />
      </div>
      <div className="edge-light relative mt-12 rounded-2xl border border-line bg-surface/50 px-4 pb-6 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <p className="hud">automation flow · agente sdr</p>
          <p className="hud hidden sm:block">loop de tools · llm</p>
        </div>
        <SystemGraph
          graph={p.graph}
          title="Fluxo de automação do Agente SDR"
          tiers={[
            { x: 80, name: "Canal" },
            { x: 270, name: "Entrada" },
            { x: 470, name: "Motor · IA" },
            { x: 700, name: "Ações" },
            { x: 900, name: "Saída" },
          ]}
        />
      </div>
      <StackAndLinks p={p} className="mt-8" />
    </article>
  );
}

function MoreProjects() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h3 className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink">
          <span className="text-blue" aria-hidden>
            {"// "}
          </span>
          Também construí
        </h3>
        <span aria-hidden data-reveal="rule" className="h-px flex-1 bg-line" />
        <span className="hud hidden sm:block">{moreProjects.length} sistemas</span>
      </div>
      <ul className="mt-8 border-t border-line">
        {moreProjects.map((m, i) => (
          <li
            key={m.title}
            data-reveal
            style={d(Math.min(i, 6) * 50)}
            className="grid-cols-1 group grid gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/40 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline md:px-3"
          >
            <div>
              <p className="text-[1.05rem] font-medium text-ink">{m.title}</p>
              <p className="label mt-1.5">{m.kind}</p>
            </div>
            <div className="min-w-0">
              <p className="text-pretty text-[0.92rem] leading-7 text-ink-muted">{m.text}</p>
              <p className="mt-1.5 font-mono text-[0.68rem] text-ink-faint">{m.stack}</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
              {m.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-blue"
                >
                  {l.kind === "code" ? <GithubIcon className="size-3.5" /> : null}
                  {l.label}
                  {l.kind === "live" ? <ArrowUpRight aria-hidden className="size-3.5" /> : null}
                </a>
              ))}
              {m.note ? <span className="text-[0.75rem] text-ink-faint">{m.note}</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="projetos-title"
          index="01"
          label="Selected engineering projects"
          meta="4 cases · 2026"
          statement="Sistemas que construí, sozinho ou em dupla, e que estão no ar."
          lead="Cada case mostra o problema, a arquitetura e a minha parte no código. Quando o trabalho foi feito em dupla, isso está escrito."
        />
        <div className="mt-20 grid gap-28 lg:mt-28 lg:gap-40">
          <CaseCadenceFlow />
          <CaseNoivar />
          <CaseNucleo />
          <CaseSdr />
          <MoreProjects />
        </div>
      </div>
    </section>
  );
}
