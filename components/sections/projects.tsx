import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { IPhone } from "@/components/ui/iphone";
import { CodeLines } from "@/components/ui/code";
import { Console, LiveDot, Readouts } from "@/components/ui/console";
import { Window } from "@/components/ui/window";
import { GithubIcon } from "@/components/ui/icons";
import { SystemGraph } from "@/components/diagrams/system-graph";
import { PixAnatomy } from "@/components/diagrams/pix-anatomy";
import { RequestFlow } from "@/components/diagrams/request-flow";
import { cadenceflow, moreProjects, noivar, nucleo, sdr, type Project, type Shot } from "@/lib/projects";
import { pixAnatomy } from "@/lib/pix";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/* ----------------------------------------------------------------------------
   Case parts. Every case opens with a slate and its title, then recomposes
   these parts in its own layout: the layout is the argument of the case.
---------------------------------------------------------------------------- */

function Case({ p, children }: { p: Project; children: ReactNode }) {
  return (
    <article id={`case-${p.slug}`} aria-labelledby={`case-${p.slug}-title`} className="scroll-mt-24">
      <Slate p={p} />
      {children}
    </article>
  );
}

// The slate: case number and name on the left, the only status claim on the
// right (the address answers).
function Slate({ p }: { p: Project }) {
  const live = p.links.find((l) => l.kind === "live");
  return (
    <div className="console ticks flex min-h-11 flex-wrap items-center gap-x-6 gap-y-1.5 px-4 py-3 sm:px-5">
      <p className="hud text-ink-muted">
        <span className="text-blue tabular">Case {p.index}</span> · {p.title}
      </p>
      <span aria-hidden className="ruler hidden h-[7px] min-w-8 flex-1 opacity-60 md:block" />
      {live ? (
        <p className="hud ml-auto">
          <LiveDot>
            <span>
              no ar · <span className="normal-case tracking-[0.04em] text-ink-muted">{new URL(live.href).host}</span>
            </span>
          </LiveDot>
        </p>
      ) : null}
    </div>
  );
}

function Title({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <h3 id={`case-${p.slug}-title`} data-title className={`display text-ink ${className}`}>
      {p.title}
    </h3>
  );
}

function Lede({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div className={className}>
      <p className="max-w-[34rem] text-pretty text-lg leading-8 text-ink-muted sm:text-[1.2rem]">{p.tagline}</p>
      {/* the pill and the year travel together, so a wrap never strands a separator */}
      <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[0.875rem] text-ink-muted">
        <span>{p.kind}</span>
        <span className="inline-flex min-w-0 items-center gap-3">
          <span className="rounded-[5px] border border-line-strong bg-surface/70 px-2.5 py-1 leading-5 text-ink">{p.role}</span>
          <span aria-hidden className="text-line-strong">
            ·
          </span>
          <span className="font-mono text-[0.8125rem] text-ink-faint tabular">{p.year}</span>
        </span>
      </p>
    </div>
  );
}

function ProblemSolution({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <dl data-reveal className={`grid content-start gap-8 ${className}`}>
      {(
        [
          ["Problema", p.problem],
          ["Solução", p.solution],
        ] as const
      ).map(([k, v]) => (
        <div key={k} className="border-t border-line pt-4">
          <dt className="label">{k}</dt>
          <dd className="mt-3 max-w-2xl text-pretty text-base leading-7 text-ink-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// Co-authorship stays verbatim, framed and in full ink. A note, not a landmark:
// an <aside> here would be a complementary region nested inside the section.
function AuthorNote({ note }: { note: string }) {
  return (
    <div role="note" className="console mt-8 px-4 py-4 sm:px-5">
      <p className="label flex items-center gap-2 text-ink-muted">
        <Info aria-hidden className="size-3.5 text-blue" strokeWidth={1.75} />
        Autoria
      </p>
      <p className="mt-2.5 text-pretty text-[0.9375rem] leading-7 text-ink">{note}</p>
    </div>
  );
}

function Contribution({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div data-reveal style={d(100)} className={className}>
      <h4 className="label">Decisões e entregas técnicas</h4>
      <ol className="mt-4 border-t border-line">
        {p.contribution.map((c, i) => (
          <li key={c} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 border-b border-line-faint py-4 text-pretty text-[0.9375rem] leading-7 text-ink">
            <span aria-hidden className="pt-[0.2rem] font-mono text-[0.72rem] text-blue tabular">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="max-w-2xl">{c}</span>
          </li>
        ))}
      </ol>
      {p.note ? <AuthorNote note={p.note} /> : null}
    </div>
  );
}

function StackAndLinks({ p, className = "" }: { p: Project; className?: string }) {
  const hasCode = p.links.some((l) => l.kind === "code");
  return (
    <div className={className}>
      <ul aria-label="Stack" className="flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <li key={s} className="rounded-[5px] border border-line bg-surface/60 px-2 py-1 font-mono text-[0.72rem] text-ink-muted">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        {p.links.map((l) =>
          l.kind === "live" ? (
            <Button key={l.href} href={l.href} external variant="secondary" arrow="out">
              {l.label}
            </Button>
          ) : (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <GithubIcon className="size-4" />
              {l.label}
            </a>
          ),
        )}
        {!hasCode ? <span className="text-[0.8125rem] text-ink-faint">código privado</span> : null}
      </div>
    </div>
  );
}

// Parameters written in the project's code and docs, printed as readouts.
function Params({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div className={className}>
      <p className="hud mb-3">parâmetros · código e docs</p>
      <Readouts items={p.readouts} />
    </div>
  );
}

// A real capture of the live product. From sm up: the desktop page in a browser
// whose screen powers on, with the phone capture overlapping it. Below sm the
// phone alone, centred: the mobile page is the story there.
function Capture({
  shot,
  phoneAlt,
  frameSizes,
  phoneClassName,
  captionClassName = "",
  className = "",
}: {
  shot: Shot;
  phoneAlt: string;
  frameSizes: string;
  phoneClassName: string;
  captionClassName?: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="relative">
        <BrowserFrame url={shot.url} className="hidden sm:block">
          <div data-power>
            <Image src={shot.desktop} alt={shot.alt} width={1440} height={900} sizes={frameSizes} className="block h-auto w-full" />
          </div>
        </BrowserFrame>
        {shot.mobile ? (
          <div data-reveal className={`relative z-10 mx-auto w-[min(15.5rem,66vw)] sm:absolute sm:mx-0 sm:[--d:420ms] ${phoneClassName}`}>
            <IPhone src={shot.mobile} url={shot.url} alt={phoneAlt} sizes="(min-width: 640px) 192px, 66vw" className="w-full" />
          </div>
        ) : null}
      </div>
      <figcaption className={`mt-5 text-center text-[0.8125rem] leading-5 text-ink-faint sm:text-left ${captionClassName}`}>
        {shot.caption}
      </figcaption>
    </figure>
  );
}

// The hard cut between cases: space, then a ruler drawing across.
function Cut() {
  return (
    <div aria-hidden className="py-24 sm:py-32 lg:py-40">
      <span data-reveal="rule" className="ruler block" />
    </div>
  );
}

/* ---------------------------------------------------------------- 01
   Wide: the title across the page, the product across eight columns. */
function CaseCadenceFlow() {
  const p = cadenceflow;
  return (
    <Case p={p}>
      <Title p={p} className="mt-12 text-[clamp(2.4rem,7.4vw,5.25rem)] [--wdth:125] lg:mt-16" />
      <div className="mt-10 grid grid-cols-1 gap-y-12 lg:mt-12 lg:grid-cols-12 lg:gap-x-10">
        <Lede p={p} className="lg:col-span-4 lg:col-start-9 lg:row-start-1" />
        {p.shot ? (
          <Capture
            shot={p.shot}
            phoneAlt="CadenceFlow no celular: a mesma página pública na versão mobile"
            frameSizes="(min-width: 1320px) 800px, (min-width: 1024px) 62vw, 92vw"
            phoneClassName="sm:-bottom-10 sm:right-4 sm:w-[9.5rem] md:w-[11rem] lg:-bottom-16 lg:-right-10 lg:w-[10.5rem] xl:w-[12rem]"
            captionClassName="sm:pr-[12rem] lg:pr-[10rem]"
            className="lg:col-span-8 lg:col-start-1 lg:row-start-1"
          />
        ) : null}
      </div>

      <Params p={p} className="mt-16 sm:mt-24" />

      <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <ProblemSolution p={p} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start" />
        <div className="lg:col-span-6 lg:col-start-7">
          <Contribution p={p} />
          <StackAndLinks p={p} className="mt-10" />
        </div>
      </div>

      <Console
        label="arquitetura · cadenceflow"
        status={<span className="hidden sm:inline">produção · 3 instâncias</span>}
        className="mt-16 lg:mt-24"
        bodyClassName="px-4 pb-5 pt-6 sm:px-6 lg:px-8 lg:pt-8"
      >
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
      </Console>
    </Case>
  );
}

/* ---------------------------------------------------------------- 02
   Product + engine: the wedding site and its gift flow, then the Pix
   payload the engine writes. */
function CaseNoivar() {
  const p = noivar;
  const pix = pixAnatomy({ key: "123e4567-e89b-12d3-a456-426614174000", name: "HELENA E LUCAS", city: "SAO PAULO", amount: 150, txid: "NOIVAR01" });
  return (
    <Case p={p}>
      <div className="mt-12 grid grid-cols-1 gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
        <header className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <Title p={p} className="text-[clamp(2.4rem,6.2vw,4.75rem)] [--wdth:118]" />
          <Lede p={p} className="mt-7" />
        </header>
        {p.shot ? (
          <Capture
            shot={p.shot}
            phoneAlt="Noivar no celular: modal de presente em dinheiro com valor e botão Gerar Pix"
            frameSizes="(min-width: 1320px) 700px, (min-width: 1024px) 55vw, 92vw"
            phoneClassName="sm:-bottom-12 sm:right-4 sm:w-[9.5rem] md:w-[11rem] lg:-bottom-16 lg:-right-6 xl:w-[12rem]"
            captionClassName="sm:pr-[12rem] lg:pr-[11rem]"
            className="lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start"
          />
        ) : null}
        <ProblemSolution p={p} className="lg:col-span-5 lg:col-start-8 lg:row-start-2" />
      </div>

      <Params p={p} className="mt-16 sm:mt-24" />

      <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Contribution p={p} />
          <StackAndLinks p={p} className="mt-10" />
        </div>
        <div data-reveal style={d(120)} className="min-w-0 lg:col-span-7">
          <Window
            label="Anatomia de um payload Pix BR Code, com dados fictícios"
            title={
              <>
                <span className="text-ink-faint">noivar › src › lib ›</span> pix.ts
              </>
            }
            meta={<span className="hidden sm:inline">buildPixPayload()</span>}
            status={
              <>
                <span>dados fictícios</span>
                <span className="ml-auto">TLV · CRC16-CCITT</span>
              </>
            }
            bodyClassName="p-4 sm:p-5"
          >
            <PixAnatomy segments={pix.segments} />
          </Window>
        </div>
      </div>
    </Case>
  );
}

/* ---------------------------------------------------------------- 03
   Request lifecycle: the trace is the dominant instrument, the product
   and the real worker code beside it. */
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
    <Case p={p}>
      <div className="mt-12 grid grid-cols-1 gap-y-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="min-w-0 lg:col-span-5">
          <Title p={p} className="text-[clamp(2.4rem,6.2vw,4.75rem)] [--wdth:118]" />
          <Lede p={p} className="mt-7" />
          {p.shot ? (
            <Capture
              shot={p.shot}
              phoneAlt="Núcleo no celular: a mesma página pública na versão mobile"
              frameSizes="(min-width: 1320px) 490px, (min-width: 1024px) 38vw, 92vw"
              phoneClassName="sm:hidden"
              className="mt-12"
            />
          ) : null}
          <ProblemSolution p={p} className="mt-14" />
        </div>

        <div className="flex min-w-0 flex-col gap-8 lg:col-span-7">
          <Console
            label="ciclo de uma requisição · núcleo"
            status={<span className="hidden sm:inline">rota e eventos reais</span>}
            bodyClassName="p-5 sm:p-7"
          >
            <RequestFlow />
          </Console>
          <div data-reveal style={d(120)}>
            <Window
              label="Trecho real do worker de automações do Núcleo"
              title={
                <>
                  {/* the deep prefix goes on phones, so the file name never truncates */}
                  <span className="text-ink-faint">
                    <span className="hidden sm:inline">apps › api › modules › </span>automations ›
                  </span>{" "}
                  worker.ts
                </>
              }
              meta={<span className="hidden sm:inline">TypeScript · SQL</span>}
              status={
                <>
                  <span>trecho real · Núcleo</span>
                  <span className="ml-auto hidden sm:inline">outbox transacional</span>
                </>
              }
            >
              <CodeLines code={claimBatch} highlight={[10]} size="sm" />
            </Window>
          </div>
        </div>
      </div>

      <Params p={p} className="mt-16 sm:mt-24" />

      <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <Contribution p={p} className="lg:col-span-7" />
        <StackAndLinks p={p} className="lg:col-span-4 lg:col-start-9 lg:pt-9" />
      </div>
    </Case>
  );
}

/* ---------------------------------------------------------------- 04
   Graph first: no public page to show (the live address is a login), so the
   architecture is the visual. */
function CaseSdr() {
  const p = sdr;
  return (
    <Case p={p}>
      <div className="mt-12 grid grid-cols-1 gap-y-8 lg:mt-16 xl:grid-cols-12 xl:items-end xl:gap-x-10">
        <Title p={p} className="text-[clamp(2.4rem,6.2vw,4.75rem)] [--wdth:118] xl:col-span-8" />
        <Lede p={p} className="xl:col-span-4 xl:pb-2" />
      </div>

      <div data-power className="mt-12 lg:mt-16">
        <Console
          label="fluxo de automação · agente sdr"
          status={<span className="hidden sm:inline">loop de tools · llm</span>}
          bodyClassName="px-4 pb-5 pt-6 sm:px-6 lg:px-8 lg:pt-8"
        >
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
        </Console>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <ProblemSolution p={p} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start" />
        <Contribution p={p} className="lg:col-span-6 lg:col-start-7" />
      </div>

      <Params p={p} className="mt-16 sm:mt-20" />
      <StackAndLinks p={p} className="mt-12" />
    </Case>
  );
}

/* ----------------------------------------------------------------------------
   Também construí: a mission manifest of the other systems.
---------------------------------------------------------------------------- */
const manifestCols = "md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,10rem)]";

function MoreProjects() {
  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        <h3 data-title className="display text-[clamp(1.9rem,3.6vw,3rem)] text-ink [--wdth:112]">
          Também construí
        </h3>
        <span aria-hidden data-reveal="rule" className="ruler mb-2 min-w-24 flex-1" />
        <span className="hud mb-1.5 shrink-0">{moreProjects.length} sistemas</span>
      </div>

      <div aria-hidden className={`hud mt-12 hidden gap-x-10 border-b border-line px-3 pb-3 md:grid ${manifestCols}`}>
        <span>sistema</span>
        <span>o que faz · stack</span>
        <span className="text-right">acesso</span>
      </div>
      <ul data-stagger className="mt-8 border-t border-line md:mt-0 md:border-t-0">
        {moreProjects.map((m, i) => (
          <li
            key={m.title}
            className={`grid grid-cols-1 gap-x-10 gap-y-3 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/40 md:px-3 ${manifestCols}`}
          >
            <div className="flex gap-3">
              <span aria-hidden className="pt-1 font-mono text-[0.6875rem] text-ink-faint tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[1.0625rem] font-medium leading-6 text-ink">{m.title}</p>
                <p className="label mt-1.5">{m.kind}</p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-pretty text-[0.9375rem] leading-7 text-ink-muted">{m.text}</p>
              <p className="mt-2 font-mono text-[0.72rem] leading-5 text-ink-faint">{m.stack}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 md:flex-col md:items-end md:gap-y-0">
              {m.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-blue md:min-h-8"
                >
                  {l.kind === "code" ? <GithubIcon className="size-3.5" /> : null}
                  {l.label}
                  {/* "Web" and "Código" repeat down the list: name the system for screen readers */}
                  <span className="sr-only"> · {m.title}</span>
                  {l.kind === "live" ? <ArrowUpRight aria-hidden className="size-3.5" /> : null}
                </a>
              ))}
              {m.note ? <span className="text-[0.8125rem] text-ink-faint md:pt-1.5">{m.note}</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projetos" data-station="01" data-station-label="Projetos" aria-labelledby="projetos-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="projetos-title"
          index="01"
          label="Projetos"
          meta="4 sistemas no ar"
          statement="Sistemas que resolvem problemas reais, e estão no ar."
          lead="Cada case mostra o problema, a arquitetura e a minha parte no código. Quando o trabalho foi feito em dupla, isso está escrito."
        />
        <div className="mt-20 lg:mt-28">
          <CaseCadenceFlow />
          <Cut />
          <CaseNoivar />
          <Cut />
          <CaseNucleo />
          <Cut />
          <CaseSdr />
          <Cut />
          <MoreProjects />
        </div>
      </div>
    </section>
  );
}
