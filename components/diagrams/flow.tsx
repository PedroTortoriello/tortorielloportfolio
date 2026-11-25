"use client";

import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, X } from "lucide-react";
import css from "@/components/case/case.module.css";
import { useLocale } from "@/lib/i18n/client";
import type { Hop } from "@/lib/projects";
import { playCue } from "@/lib/sound";
import { isStill, onStillChange } from "@/lib/still";
import { useMotionOk } from "@/lib/use-motion-ok";

const COPY = {
  en: {
    play: "Play the flow",
    pause: "Pause",
    resume: "Resume",
    replay: "Replay",
    prev: "Previous step",
    next: "Next step",
    close: "Close the flow",
    step: "Step",
    of: "of",
    list: "Data flow · step by step",
  },
  pt: {
    play: "Reproduzir o fluxo",
    pause: "Pausar",
    resume: "Continuar",
    replay: "Repetir",
    prev: "Etapa anterior",
    next: "Próxima etapa",
    close: "Fechar o fluxo",
    step: "Etapa",
    of: "de",
    list: "Fluxo de dados · etapa por etapa",
  },
} as const;

export const TRAVEL = 900; // ms for the packet to cross one edge

const pad = (n: number) => String(n).padStart(2, "0");

// The map registers how to place its packet; the clock calls it every frame.
type Draw = (step: number, ms: number, animate: boolean) => void;

type Flow = {
  step: number; // -1 at rest
  count: number;
  playing: boolean;
  ended: boolean;
  play: () => void;
  pause: () => void;
  go: (i: number) => void;
  close: () => void;
  setDraw: (d: Draw | null) => void;
};

const FlowContext = createContext<Flow | null>(null);
export const useFlow = () => use(FlowContext);

// A step lasts as long as its packet travels or as long as it takes to read, whichever is longer.
const duration = (text: string, edges: number) =>
  Math.max(edges * TRAVEL + 1400, Math.min(9000, Math.max(3200, text.split(/\s+/).length * 250)));

// Walks the case's data flow step by step. One rAF clock: it only runs while
// playing and while this block is on screen (rAF itself sleeps in a hidden tab),
// and its time step is capped, so a stalled frame never skips a step. Under
// reduced motion or "Pause motion" the steps still change, but nothing travels
// and nothing fades.
export function FlowProvider({ steps, hops, children }: { steps: string[]; hops?: Hop[][]; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const draw = useRef<Draw | null>(null);
  const elapsed = useRef(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const still = useSyncExternalStore(onStillChange, isStill, () => false);
  const animate = useMotionOk() && !still;
  const count = steps.length;
  const times = useMemo(() => steps.map((s, i) => duration(s, hops?.[i]?.filter((h) => h.to).length ?? 0)), [steps, hops]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((i: number) => {
    elapsed.current = 0;
    setEnded(false);
    setStep(i);
  }, []);

  useEffect(() => {
    if (!playing || !onScreen || step < 0) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 64);
      last = now;
      if (animate) draw.current?.(step, elapsed.current, true);
      if (elapsed.current < times[step]) raf = requestAnimationFrame(tick);
      else if (step < count - 1) {
        go(step + 1);
        playCue("seed");
      } else {
        setPlaying(false);
        setEnded(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, onScreen, step, animate, times, count, go]);

  // A new step (or motion switched off) repositions the packet even while paused.
  useEffect(() => draw.current?.(step, elapsed.current, animate), [step, animate]);

  const value = useMemo<Flow>(
    () => ({
      step,
      count,
      playing,
      ended,
      play: () => {
        if (step < 0 || ended) go(0);
        setPlaying(true);
        playCue("click");
      },
      pause: () => {
        setPlaying(false);
        playCue("click");
      },
      go: (i) => {
        go(i);
        playCue("click");
      },
      close: () => {
        setPlaying(false);
        go(-1);
        playCue("close");
      },
      setDraw: (d) => {
        draw.current = d;
      },
    }),
    [step, count, playing, ended, go],
  );

  return (
    <FlowContext value={value}>
      {/* "Pause motion" also stops the fades between steps */}
      <div ref={root} className={still ? "[&_*]:!transition-none" : undefined}>
        {children}
      </div>
    </FlowContext>
  );
}

// aria-disabled, not disabled: a button that runs out of steps keeps the keyboard focus.
const iconBtn =
  "grid size-11 shrink-0 place-items-center text-ink-muted transition-colors duration-300 hover:text-accent aria-disabled:pointer-events-none aria-disabled:opacity-30";

// The map's header: its title and the play control; while a step is on, the
// step itself (counter, previous and next, the text). From tablet up it stays
// under the site header while the map scrolls beneath it.
export function FlowPlayer({ title, titleId, steps }: { title: ReactNode; titleId: string; steps: string[] }) {
  const f = useFlow();
  const playBtn = useRef<HTMLButtonElement>(null);
  const t = COPY[useLocale()];
  if (!f) return null;
  const on = f.step >= 0;
  const label = f.playing ? t.pause : f.ended ? t.replay : on ? t.resume : t.play;
  const Icon = f.playing ? Pause : f.ended ? RotateCcw : Play;

  return (
    <div className={on ? "bg-surface md:sticky md:top-[var(--header-h)] md:z-10" : undefined}>
      <div className="flex min-h-11 items-center gap-2 border-b border-line pl-4 sm:pl-6">
        <p id={titleId} className="t-label mr-auto py-3">
          {title}
        </p>
        <button
          ref={playBtn}
          type="button"
          onClick={f.playing ? f.pause : f.play}
          className="inline-flex h-11 shrink-0 items-center gap-2.5 border-l border-line px-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-accent sm:px-5"
        >
          <Icon aria-hidden strokeWidth={1.75} className="size-3.5 text-accent" />
          {label}
        </button>
        {on ? (
          <button
            type="button"
            aria-label={t.close}
            onClick={() => {
              f.close();
              playBtn.current?.focus(); // this button leaves with the step: keep focus in the player
            }}
            className={`${iconBtn} border-l border-line`}
          >
            <X aria-hidden strokeWidth={1.75} className="size-4" />
          </button>
        ) : null}
      </div>

      {on ? (
        <div className="border-b border-line px-2 pb-4 sm:px-4 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-4 md:py-3">
          <div className="flex items-center">
            <button
              type="button"
              aria-label={t.prev}
              aria-disabled={f.step === 0}
              onClick={() => f.step > 0 && f.go(f.step - 1)}
              className={iconBtn}
            >
              <ChevronLeft aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
            <p className="t-label tabular min-w-14 text-center">
              <span className="text-accent">{pad(f.step + 1)}</span> / {pad(f.count)}
            </p>
            <button
              type="button"
              aria-label={t.next}
              aria-disabled={f.step === f.count - 1}
              onClick={() => f.step < f.count - 1 && f.go(f.step + 1)}
              className={iconBtn}
            >
              <ChevronRight aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
          </div>
          {/* every step shares one cell: the longest sets the height, so stepping never shifts the page */}
          <div aria-hidden className="grid px-2 text-[0.9375rem] leading-[1.65] text-ink md:px-0 md:pt-2.5 [&>*]:[grid-area:1/1]">
            {steps.map((s, i) => (
              <p key={i} className={i === f.step ? "" : "invisible"}>
                {s}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {on ? `${t.step} ${f.step + 1} ${t.of} ${f.count}: ${steps[f.step]}` : ""}
      </p>
    </div>
  );
}

// The step list: the playing step lights up (lime number, ink text). At rest a
// packet keeps running down the rail.
export function FlowSteps({ steps }: { steps: string[] }) {
  const step = useFlow()?.step ?? -1;
  const t = COPY[useLocale()];
  return (
    <div>
      <h3 className="t-label">{t.list}</h3>
      <div className="relative mt-6">
        {/* rail and packet sit beside the list: an <ol> may only hold <li> */}
        <span aria-hidden className="absolute bottom-6 left-[13.5px] top-6 w-px bg-line-strong" />
        {/* spans the rail; translateY(-100%) of its own height walks the dot down it */}
        {step < 0 ? (
          <span aria-hidden className={`motion-only pointer-events-none absolute bottom-5 left-[11px] top-5 w-[5px] ${css.packet}`}>
            <span className="absolute left-0 top-full size-[5px] rounded-full bg-violet-soft" />
          </span>
        ) : null}
        <ol data-stagger>
          {steps.map((s, i) => {
            const on = i === step;
            return (
              <li key={s} aria-current={on ? "step" : undefined} className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 py-3">
                <span
                  aria-hidden
                  className={`grid size-7 place-items-center rounded-full border bg-black font-mono text-[0.6875rem] tabular transition-colors duration-300 ${
                    on ? "border-accent text-accent" : "border-line-strong text-ink"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <p
                  className={`pt-0.5 text-[0.9375rem] leading-[1.65] transition-colors duration-300 ${on ? "text-ink" : "text-ink-muted"}`}
                >
                  {s}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
