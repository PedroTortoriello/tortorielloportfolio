"use client";

import { useId, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useLocale } from "@/lib/i18n/client";
import { playCue } from "@/lib/sound";

const COPY = {
  en: {
    label: "Your time",
    your: "Your",
    my: "my",
    nextDay: "next day",
    prevDay: "previous day",
    inside: "Inside my working hours",
    outside: "Outside my working hours",
    detected: "Detected",
    window: (mine: string, yours: string) => `My ${mine} in São Paulo is your ${yours}.`,
    overlap: (day: string) => `of overlap with a ${day} day where you are.`,
    valueText: (yours: string, mine: string) => `${yours} your time, ${mine} in São Paulo`,
  },
  // "aí" / "aqui": where you are / where I am (no gender or number to agree with the hour)
  pt: {
    label: "Seu horário",
    your: "Aí",
    my: "aqui",
    nextDay: "dia seguinte",
    prevDay: "dia anterior",
    inside: "Dentro do meu expediente",
    outside: "Fora do meu expediente",
    detected: "Detectado",
    window: (mine: string, yours: string) => `Meu expediente, ${mine} em São Paulo, equivale a ${yours} no seu fuso.`,
    overlap: (day: string) => `de sobreposição com um dia de trabalho de ${day} onde você está.`,
    valueText: (yours: string, mine: string) => `${yours} no seu horário, ${mine} em São Paulo`,
  },
} as const;

const SP = "America/Sao_Paulo";
const DAY = 1440;
const WORK = [9 * 60, 18 * 60] as const; // São Paulo working hours, in minutes

// The visitor's zone, read once on the client. diff = minutes São Paulo is
// ahead of the visitor. São Paulo has been UTC−3 all year since Brazil dropped
// DST in 2019; Intl is read anyway, with that as the fallback.
type Zone = { city: string; offset: number; diff: number };
let zone: Zone | undefined;
function readZone() {
  if (zone) return zone;
  const now = new Date();
  const name = new Intl.DateTimeFormat("en-US", { timeZone: SP, timeZoneName: "longOffset" })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = name?.match(/([+-])(\d\d):(\d\d)/);
  const sp = m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : -180;
  const offset = -now.getTimezoneOffset();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  zone = { city: (tz.split("/").pop() ?? "").replace(/_/g, " "), offset, diff: sp - offset };
  return zone;
}
const subscribe = () => () => {};

const pad = (n: number) => String(n).padStart(2, "0");
const wrap = (min: number) => ((min % DAY) + DAY) % DAY;
const hhmm = (min: number) => `${pad(Math.floor(wrap(min) / 60))}:${pad(wrap(min) % 60)}`;
const span = ([a, b]: readonly [number, number]) => `${hhmm(a)}–${hhmm(b)}`;
const inWork = (spMin: number) => wrap(spMin) >= WORK[0] && wrap(spMin) < WORK[1];
const utc = (min: number) =>
  min === 0
    ? "UTC"
    : `UTC${min < 0 ? "−" : "+"}${Math.floor(Math.abs(min) / 60)}${Math.abs(min) % 60 ? `:${pad(Math.abs(min) % 60)}` : ""}`;
const duration = (min: number) =>
  [Math.floor(min / 60) && `${Math.floor(min / 60)} h`, min % 60 && `${min % 60} min`].filter(Boolean).join(" ") || "0 h";

// Minutes of São Paulo's working day that land inside the visitor's own
// 09:00–18:00 (the window may cross the visitor's midnight, hence ±1 day).
function overlap(diff: number) {
  let sum = 0;
  for (const k of [-DAY, 0, DAY]) sum += Math.max(0, Math.min(WORK[1], WORK[1] - diff + k) - Math.max(WORK[0], WORK[0] - diff + k));
  return sum;
}

// For recruiters elsewhere: pick an hour in your own time zone and read mine.
// The ticks mark the hours that fall inside my working day; the slider is a
// native range (arrows, Home/End, touch). Placeholders until hydration, the
// same rows after, so nothing moves.
export function TzConverter({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const id = useId();
  const copy = COPY[useLocale()];
  const z = useSyncExternalStore(subscribe, readZone, () => null);
  const [hour, setHour] = useState(9);

  const local = hour * 60;
  const sp = local + (z?.diff ?? 0);
  const shift = Math.floor(sp / DAY);
  const t = (min: number) => (z ? hhmm(min) : "--:--");

  return (
    <div data-reveal style={style} className={`grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6 [html:not(.js)_&]:hidden ${className}`}>
      <label htmlFor={id} className="t-label t-bracket md:col-span-3 md:pt-1 lg:col-span-2">
        {copy.label}
      </label>

      <div className="min-w-0 md:col-span-9 lg:col-span-7">
        <p className="flex flex-wrap items-baseline gap-x-[0.35em] text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold uppercase leading-none tracking-[-0.04em]">
          <span className="text-[#8a8a8a]">{copy.your}</span>
          <span className="tabular text-ink">{t(local)}</span>
          <span className="text-[#8a8a8a]">=</span>
          <span className="text-[#8a8a8a]">{copy.my}</span>
          <span className="tabular text-ink">{t(sp)}</span>
          {z && shift ? <span className="t-label self-center font-normal">{shift > 0 ? copy.nextDay : copy.prevDay}</span> : null}
        </p>
        <p className="t-label mt-4">{z ? `${inWork(sp) ? copy.inside : copy.outside} · ${span(WORK)}` : " "}</p>

        <div className="relative mt-5">
          {/* one tick per hour along the thumb's travel (inset by its radius); taller ones are my working hours */}
          <div aria-hidden className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 items-center justify-between">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className={`w-px ${z && inWork(i * 60 + z.diff) ? "h-3 bg-ink" : "h-1.5 bg-line-strong"}`} />
            ))}
          </div>
          <input
            id={id}
            type="range"
            min={0}
            max={23}
            step={1}
            value={hour}
            disabled={!z}
            aria-valuetext={copy.valueText(t(local), t(sp))}
            onChange={(e) => {
              setHour(Number(e.target.value));
              playCue("click");
            }}
            className="relative block h-11 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-default [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-line-strong [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-line-strong [&::-webkit-slider-thumb]:-mt-[7.5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          />
        </div>
        <div aria-hidden className="t-label tabular relative mx-2 h-4">
          {[0, 6, 12, 18, 23].map((i) => (
            <span key={i} className="absolute top-0 -translate-x-1/2" style={{ left: `${(i / 23) * 100}%` }}>
              {pad(i)}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-9 md:col-start-4 lg:col-span-3 lg:col-start-10 lg:pt-1">
        <p className="t-label">{z ? [copy.detected, z.city, utc(z.offset)].filter(Boolean).join(" · ") : " "}</p>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.6] text-ink-muted">
          {copy.window(span(WORK), z ? span([WORK[0] - z.diff, WORK[1] - z.diff]) : "--:--–--:--")}{" "}
          <span className="text-ink">{z ? duration(overlap(z.diff)) : "--"}</span> {copy.overlap(span(WORK))}
        </p>
      </div>
    </div>
  );
}
