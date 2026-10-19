import { Boxes, FileText, Layers, Plug, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeLines } from "@/components/ui/code";
import { Window } from "@/components/ui/window";
import { profile, specialties } from "@/lib/data";
import { HeroStage } from "./hero-stage";
import { NetworkCanvas } from "./network-canvas";
import { Terminal } from "./terminal";

const icons = { layers: Layers, plug: Plug, workflow: Workflow, boxes: Boxes };

// Real excerpt: CadenceFlow, saas/src/lib/tracking-bot.ts, lines 121-129
// (module written by Pedro). Shown with its original line numbers.
const heroSnippet = `export function isScannerHit(
  userAgent: string,
  sentAt: Date | null | undefined,
  now: Date = new Date(),
  janelaMs: number = SCANNER_WINDOW_CLICK_MS,
): boolean {
  if (isBotUserAgent(userAgent) || PREFETCH_UA.test(userAgent)) return true;
  return !!sentAt && now.getTime() - sentAt.getTime() < janelaMs;
}`;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <HeroStage className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* living background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="enter-fade absolute inset-0 bg-[radial-gradient(1100px_700px_at_78%_18%,rgb(67_136_255/0.17),transparent_62%),radial-gradient(700px_500px_at_8%_100%,rgb(70_217_255/0.06),transparent_60%)]" />
        <div
          className="tech-grid enter-fade absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_62%_38%,black_20%,transparent_75%)]"
          style={d(150)}
        />
        <NetworkCanvas className="absolute inset-0 size-full opacity-50 lg:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(520px_circle_at_var(--cx,70%)_var(--cy,30%),rgb(67_136_255/0.09),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
        {/* HUD corner marks */}
        <div className="container-x absolute inset-x-0 top-24 hidden justify-between xl:flex">
          <span className="hud enter-fade" style={d(900)}>
            system architecture
          </span>
          <span className="hud enter-fade tabular" style={d(1000)}>
            module 00 · overview
          </span>
        </div>
      </div>

      <div className="grid-cols-1 container-x grid flex-1 items-center gap-14 pb-12 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-28">
        <div className="lg:col-span-6 xl:col-span-7">
          <p
            className="enter inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-[0.78rem] text-ink-muted backdrop-blur-sm"
            style={d(100)}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-green/50 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-green" />
            </span>
            {profile.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(2.55rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-ink"
          >
            <span className="mask-line">
              <span style={d(180)}>{profile.headline[0]}</span>
            </span>
            <span className="mask-line text-ink-muted">
              <span style={d(300)}>
                {profile.headline[1]}
                <span
                  aria-hidden
                  className="ml-2 inline-block h-[0.78em] w-[0.09em] translate-y-[0.06em] animate-blink rounded-[1px] bg-blue"
                />
              </span>
            </span>
          </h1>

          <p className="enter mt-7 max-w-[34rem] text-pretty text-lg leading-8 text-ink-muted" style={d(520)}>
            {profile.description}
          </p>

          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(640)}>
            <Button href="#projetos" arrow="right">
              Explorar projetos
            </Button>
            <Button
              href={profile.cv}
              external
              variant="secondary"
              icon={<FileText aria-hidden className="size-4 text-ink-muted" />}
            >
              Ver currículo
            </Button>
          </div>

          <p className="enter mt-8 text-[0.82rem] text-ink-faint" style={d(760)}>
            <span className="text-ink-muted">{profile.name}</span> — {profile.role} | {profile.focus}
          </p>
        </div>

        {/* interface windows: terminal in front; the real code sits behind it,
            overlapping exactly its title bar so no line is cut mid-way */}
        <div className="flex flex-col lg:col-span-6 xl:col-span-5">
          <div className="enter-window relative z-10 lg:w-full xl:w-[min(31rem,42vw)]" style={d(420)}>
            <div className="lg:[transform:translate3d(calc(var(--px,0)*-10px),calc(var(--py,0)*-8px),0)] lg:transition-transform lg:duration-700 lg:ease-out">
              <Terminal />
            </div>
          </div>
          <div className="enter-window relative z-0 -mt-10 -mr-6 hidden w-max self-end xl:block" style={d(700)}>
            <div className="[transform:translate3d(calc(var(--px,0)*14px),calc(var(--py,0)*10px),0)] transition-transform duration-1000 ease-out">
              <Window
                label="Trecho real de código do CadenceFlow"
                title=""
                status={
                  <>
                    <span className="text-ink-muted">cadenceflow/saas/src/lib/tracking-bot.ts</span>
                    <span className="ml-auto pl-6">trecho real · linhas 121–129</span>
                  </>
                }
              >
                <CodeLines code={heroSnippet} start={121} highlight={[127]} size="xs" />
              </Window>
            </div>
          </div>
        </div>
      </div>

      {/* specialties rail */}
      <div className="container-x pb-10 lg:pb-12">
        <ul className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {specialties.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.title}
                className={`spec group enter block border-line py-5 pr-4 lg:py-6 ${i % 2 === 1 ? "border-l pl-4 lg:pl-6" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}
                style={d(860 + i * 80)}
              >
                <span className="flex items-center gap-2.5">
                  <Icon aria-hidden className="size-4 shrink-0 text-blue/80 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.6} />
                  <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-ink">{s.title}</span>
                </span>
                <span className="mt-1.5 block text-[0.8rem] leading-snug text-ink-faint transition-colors duration-300 group-hover:text-ink-muted">{s.note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </HeroStage>
  );
}
