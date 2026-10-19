import Image from "next/image";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, specialties } from "@/lib/data";
import { FrontWall } from "./front-wall";
import { HeroStage } from "./hero-stage";
import { LocalTime } from "./local-time";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const commit = process.env.NEXT_PUBLIC_COMMIT ?? "local";

// The launch: leaves the last station's node and rises to the top-right edge,
// behind the operator console. Drawn after the track reaches the node; tick
// marks every 24 units; a light rides the line once. Fixed aspect (no stretch).
const LAUNCH = "M 7 593 C 150 588 280 540 360 440 S 520 150 680 -60";

function Launch() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className="pointer-events-none absolute left-0 -z-10 hidden aspect-square h-[min(600px,64svh)] overflow-visible lg:block"
      // pins the path's first point (7, 593) on the node centre (7.5px, 7.5px)
      style={{ top: "calc(7.5px - min(600px, 64svh) * 0.98833)" }}
    >
      <path d={LAUNCH} fill="none" stroke="#355c7e" strokeWidth="7" strokeDasharray="1 23" strokeOpacity="0.55" className="enter-fade" style={d(2700)} />
      <path d={LAUNCH} pathLength={1} fill="none" stroke="url(#launch-grad)" strokeWidth="1.4" className="boot-draw" style={d(2150)} />
      <defs>
        <linearGradient id="launch-grad" x1="0" y1="600" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5e9eff" />
          <stop offset="1" stopColor="#8dbaff" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="launch-head">
          <stop offset="0" stopColor="#cfe1ff" />
          <stop offset="0.35" stopColor="#5e9eff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#5e9eff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path id="launch-path" d={LAUNCH} fill="none" stroke="none" />
      <circle r="9" fill="url(#launch-head)" className="motion-only" opacity="0">
        <set attributeName="opacity" to="1" begin="2.15s" />
        <animateMotion dur="1.6s" begin="2.15s" fill="freeze" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.65 0 0.35 1">
          <mpath href="#launch-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

// The front wall. Boots in CSS (no JS needed to read it), then MotionRoot lifts
// the copy and the console at different speeds as the section leaves the top.
export function Hero() {
  return (
    <HeroStage className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* wall: grid, light, construction lines, crosshair — three depths */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="-0.06" className="absolute inset-0">
          <div className="drafting-grid enter-fade absolute -inset-10 [mask-image:radial-gradient(ellipse_72%_78%_at_70%_40%,black_12%,transparent_76%)] lg:transition-transform lg:duration-1000 lg:ease-out lg:[transform:translate3d(calc(var(--px,0)*-5px),calc(var(--py,0)*-5px),0)]" />
        </div>
        <div className="enter-fade absolute inset-0 bg-[radial-gradient(900px_640px_at_74%_42%,rgb(94_158_255/0.11),transparent_64%),radial-gradient(600px_420px_at_6%_96%,rgb(36_69_97/0.35),transparent_70%)]" />
        <div data-parallax="-0.14" className="absolute inset-0">
          <div className="absolute inset-0 lg:transition-transform lg:duration-700 lg:ease-out lg:[transform:translate3d(calc(var(--px,0)*-14px),calc(var(--py,0)*-10px),0)]">
            <FrontWall className="size-full opacity-60 lg:opacity-100" />
          </div>
        </div>
        <div className="motion-only absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-data-[pointer]/stage:opacity-100 lg:block">
          <span className="absolute inset-y-0 left-0 w-px bg-structure/80" style={{ transform: "translate3d(var(--cx,0),0,0)" }} />
          <span className="absolute inset-x-0 top-0 h-px bg-structure/80" style={{ transform: "translate3d(0,var(--cy,0),0)" }} />
          <span
            className="absolute left-0 top-0 font-mono text-[0.625rem] tracking-[0.08em] text-ink-faint tabular"
            style={{ transform: "translate3d(calc(var(--cx,0) + 12px),calc(var(--cy,0) + 10px),0)" }}
          >
            x <span data-cx>0000</span> · y <span data-cy>0000</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* indicators: only real values */}
      <div className="container-x hidden pt-[5.5rem] lg:block">
        <p className="hud enter-fade flex flex-wrap items-center justify-end gap-x-5 gap-y-1" style={d(900)}>
          <span>
            São Paulo · <LocalTime /> BRT
          </span>
          <span className="hidden sm:inline">desde {profile.since}</span>
          <span className="hidden sm:inline">
            commit <span className="text-ink-muted">{commit}</span>
          </span>
        </p>
      </div>

      <div className="container-x grid flex-1 grid-cols-1 items-center gap-8 pb-12 pt-24 lg:grid-cols-12 lg:gap-8 lg:pt-6">
        <div data-exit="0.08" className="lg:col-span-6 xl:col-span-7">
          <h1 id="hero-title" className="display text-[clamp(2.9rem,6.3vw,5.6rem)] font-[760] tracking-[-0.035em] text-ink [--wdth:125]">
            <span className="mask-line">
              <span style={d(120)}>Pedro</span>
            </span>
            <span className="mask-line">
              <span style={d(230)}>Tortoriello</span>
            </span>
          </h1>
          <p className="enter mt-7 text-[clamp(1.05rem,1.55vw,1.3rem)] font-medium tracking-[-0.012em] text-ink" style={d(420)}>
            {profile.role} <span className="text-line-strong">/</span> <span className="text-blue-bright">{profile.focus}</span>
          </p>
          <p className="enter mt-4 max-w-[33rem] text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted" style={d(520)}>
            {profile.description}
          </p>
          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(640)}>
            <Button href="#projetos" arrow="down">
              Explorar projetos
            </Button>
            <Button href={profile.cv} external variant="secondary" icon={<FileText aria-hidden className="size-4 text-ink-muted" />}>
              Ver currículo
            </Button>
          </div>
          <p className="enter mt-7 inline-flex items-center gap-2.5 text-[0.8125rem] text-ink-muted" style={d(760)}>
            <span className="relative flex size-2">
              <span className="motion-only absolute inset-0 rounded-full bg-blue/60 animate-[ping-soft_2.6s_ease-out_infinite]" />
              <span className="relative size-2 rounded-full bg-blue shadow-[0_0_10px_rgb(94_158_255/0.9)]" />
            </span>
            {profile.availability}
          </p>
        </div>

        {/* the operator: a portrait console that powers on, floating at its own depth.
            On phones it is a dossier strip right after the copy, still inside the fold. */}
        <div data-exit="0.2" className="lg:col-span-6 lg:flex lg:justify-end xl:col-span-5">
          <div className="enter-window w-full lg:w-[min(24rem,42svh)]" style={d(380)}>
            <div className="lg:transition-transform lg:duration-700 lg:ease-out lg:[transform:translate3d(calc(var(--px,0)*9px),calc(var(--py,0)*7px),0)]">
              <figure className="console ticks overflow-hidden shadow-[0_30px_70px_-24px_rgb(0_0_0/0.85),0_0_0_1px_rgb(94_158_255/0.04)_inset]">
                <div className="console-head bg-elevated/60">
                  <span className="hud">desenvolvedor</span>
                  <span className="hud ml-auto">São Paulo</span>
                </div>
                <div className="flex lg:block">
                <div className="power-on relative aspect-[4/5] w-[7.25rem] shrink-0 bg-surface sm:w-[8.5rem] lg:w-auto" style={d(520)}>
                  <Image
                    src="/profile/pedro-tortoriello.jpg"
                    alt="Retrato de Pedro Tortoriello de braços cruzados, com um avião de pequeno porte ao fundo"
                    fill
                    priority
                    sizes="(min-width: 1024px) 384px, 336px"
                    className="object-cover"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg/55 to-transparent" />
                </div>
                <dl className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-4 lg:hidden">
                  <div>
                    <dt className="hud">hora local</dt>
                    <dd className="mt-1 font-mono text-[0.8125rem] text-ink">
                      <LocalTime /> BRT
                    </dd>
                  </div>
                  <div>
                    <dt className="hud">em operação</dt>
                    <dd className="mt-1 font-mono text-[0.8125rem] text-ink">desde {profile.since}</dd>
                  </div>
                  <div>
                    <dt className="hud">atuação</dt>
                    <dd className="mt-1 font-mono text-[0.8125rem] text-ink">100% remota</dd>
                  </div>
                </dl>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* stations: the four specialties on the track; the trajectory runs through
          them left to right and launches from the last one, up behind the operator */}
      <div className="container-x pb-9 lg:pb-11">
        <ol aria-label="Especialidades" className="relative grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
          <span aria-hidden className="absolute inset-x-0 top-[7px] hidden h-px bg-line lg:block" />
          <span aria-hidden className="rail-draw absolute inset-x-0 top-[7px] hidden h-px bg-gradient-to-r from-blue via-blue/70 to-blue/10 lg:block" style={d(950)} />
          {specialties.map((s, i) => (
            <li key={s.title} className="relative">
              {i === specialties.length - 1 ? <Launch /> : null}
              <span
                aria-hidden
                className="enter-fade relative z-10 grid size-[15px] place-items-center rounded-full border border-blue/80 bg-bg shadow-[0_0_0_4px_var(--color-bg)]"
                style={d(950 + i * 330)}
              >
                <span className="size-[5px] rounded-full bg-blue" />
              </span>
              <p className="enter mt-4 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink" style={d(1000 + i * 330)}>
                {s.title}
              </p>
              <p className="enter mt-1 text-[0.8125rem] leading-snug text-ink-muted" style={d(1060 + i * 330)}>
                {s.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </HeroStage>
  );
}
