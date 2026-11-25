// Sound, off by default (WCAG 1.4.2: nothing plays until the visitor asks for it). A tiny Web Audio
// engine: every cue is synthesized, no files. The choice is kept in localStorage "pt-sound" and
// broadcast with SOUND_EVENT. Browsers start audio only from a gesture, so the context is created by
// the toggle's click or, when a saved "on" comes back, by the first press on the page.
// components/fx/sound-fx.tsx mounts the engine on portfolio pages and plays the click and hover cues.
import { REDUCE } from "@/lib/motion";
import { isStill, onStillChange } from "@/lib/still";

export type Cue = "click" | "hover" | "open" | "close" | "seed" | "wave" | "swell";

export const SOUND_EVENT = "pt:sound";

let on: boolean | undefined;

export const isSoundOn = () => {
  if (on === undefined && typeof window !== "undefined") {
    try {
      on = !!localStorage.getItem("pt-sound");
    } catch {
      on = false;
    }
  }
  return !!on;
};

export const onSoundChange = (cb: () => void) => {
  window.addEventListener(SOUND_EVENT, cb);
  return () => window.removeEventListener(SOUND_EVENT, cb);
};

export function toggleSound() {
  on = !isSoundOn();
  try {
    if (on) localStorage.setItem("pt-sound", "1");
    else localStorage.removeItem("pt-sound");
  } catch {
    /* storage blocked: it holds for this visit only */
  }
  // Called from a click or a key press: the moment a browser lets audio start.
  if (on) wake();
  else sync();
  window.dispatchEvent(new Event(SOUND_EVENT));
}

export function playCue(cue: Cue) {
  const c = ctx;
  if (!c || !mounted || !isSoundOn() || document.hidden) return;
  // A held key or a fast pass along the dock must not turn into a buzz.
  const now = performance.now();
  if (now - (last[cue] ?? -1e9) < (cue === "hover" ? 90 : 45)) return;
  last[cue] = now;
  if (c.state === "running") voices[cue](c, c.currentTime);
  // The press that turned sound on lands while the context is still starting: play once it runs,
  // unless that takes long enough for the cue to sound out of step.
  else c.resume().then(() => performance.now() - now < 300 && voices[cue](c, c.currentTime), noop);
}

// Gestures that may start audio. A touch pointerdown does not count (userActivation says so); its click does.
const PRESSES = ["pointerdown", "keydown", "click", "touchend"] as const;

// SoundFx mounts the engine on portfolio pages; unmounting silences it. A saved "on" starts at the first
// press, and visibility, "Pause motion" and reduced motion keep it in step.
export function mountSound() {
  mounted = true;
  const press = () => {
    if (isSoundOn() && ctx?.state !== "running" && navigator.userActivation?.isActive !== false) wake();
  };
  const reduce = matchMedia(REDUCE);
  for (const type of PRESSES) window.addEventListener(type, press, true);
  document.addEventListener("visibilitychange", sync);
  reduce.addEventListener("change", sync);
  const offStill = onStillChange(sync);
  sync();
  return () => {
    mounted = false;
    for (const type of PRESSES) window.removeEventListener(type, press, true);
    document.removeEventListener("visibilitychange", sync);
    reduce.removeEventListener("change", sync);
    offStill();
    sync();
  };
}

// ---------------------------------------------------------------------------------------------
// Engine: voices -> master gain (low) -> compressor -> speakers. The compressor's makeup gain lifts
// quiet cues by ~9 dB, hence the low master; it also keeps overlapping cues from ever getting harsh.
const LEVEL = 0.25;
const noop = () => {};
const last: Partial<Record<Cue, number>> = {};
let ctx: AudioContext | null = null;
let master!: GainNode;
let noise!: AudioBuffer;
let mounted = false; // SoundFx is on the page
let nap = 0; // suspends the context once it has faded out
let drone: { out: GainNode; srcs: AudioScheduledSourceNode[] } | null = null;

// Only from a gesture (the toggle, or the first press after a saved "on").
function wake() {
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return; // no Web Audio: stay silent
    }
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 12;
    comp.ratio.value = 4;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;
    master = ctx.createGain();
    master.connect(comp).connect(ctx.destination);
    // Two seconds of white noise, looped by every airy cue.
    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  sync();
}

// The one place that decides what runs. The context plays while sound is on, SoundFx is mounted and the
// tab is visible; otherwise it fades out and suspends, so nothing works in the background. The drone also
// rests under "Pause motion" and reduced motion, like everything else that moves on its own.
function sync() {
  const c = ctx;
  if (!c) return;
  const live = mounted && isSoundOn() && !document.hidden;
  const t = c.currentTime;
  clearTimeout(nap);
  master.gain.cancelScheduledValues(t);
  if (live) {
    master.gain.setValueAtTime(LEVEL, t);
    if (c.state !== "running") c.resume().catch(noop);
  } else {
    master.gain.setTargetAtTime(0, t, 0.05);
    nap = window.setTimeout(() => c.suspend().catch(noop), 400);
  }
  hum(c, live && !isStill() && !matchMedia(REDUCE).matches);
}

// A very quiet bed that keeps changing: A2 with a near-unison beating against it, a fifth that drifts in
// and out and a faint octave, under a low-pass that breathes. The two LFOs run at unrelated slow rates,
// so the pattern never audibly repeats. It fades in over 6s and out over ~2s.
function hum(c: AudioContext, want: boolean) {
  if (want === !!drone) return;
  const t = c.currentTime;
  if (drone) {
    drone.out.gain.cancelScheduledValues(t);
    drone.out.gain.setTargetAtTime(0, t, 0.5);
    for (const s of drone.srcs) s.stop(t + 3);
    drone = null;
    return;
  }
  const out = c.createGain();
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.025, t + 6);
  const lp = c.createBiquadFilter();
  lp.frequency.value = 520;
  lp.connect(out).connect(master);
  const fifth = c.createGain();
  fifth.gain.value = 0.14;
  fifth.connect(lp);
  drone = {
    out,
    srcs: [
      osc(c, t, 110, 0.5, lp, "triangle"),
      osc(c, t, 110.21, 0.4, lp),
      osc(c, t, 164.81, 1, fifth),
      osc(c, t, 220.4, 0.08, lp),
      osc(c, t, 0.031, 260, lp.frequency), // the filter breathes
      osc(c, t, 0.053, 0.12, fifth.gain), // the fifth drifts in and out
    ],
  };
}

// A steady oscillator through its own gain into a node, or into a parameter (then it is an LFO).
function osc(c: AudioContext, t: number, hz: number, level: number, to: AudioNode | AudioParam, type: OscillatorType = "sine") {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = hz;
  g.gain.value = level;
  o.connect(g);
  if (to instanceof AudioParam) g.connect(to);
  else g.connect(to);
  o.start(t);
  return o;
}

// An envelope into the master: exponential attack to `peak`, release to silence at `end`.
function env(c: AudioContext, t: number, attack: number, peak: number, end: number) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + end);
  g.connect(master);
  return g;
}

// A tone gliding from f0 to f1 over its length.
function tone(
  c: AudioContext,
  t: number,
  f0: number,
  f1: number,
  end: number,
  peak: number,
  attack: number,
  type: OscillatorType = "sine",
) {
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + end);
  o.connect(env(c, t, attack, peak, end));
  o.start(t);
  o.stop(t + end);
}

// White noise through a band travelling from f0 to f1: air, breaths, sweeps.
function air(c: AudioContext, t: number, f0: number, f1: number, end: number, peak: number, attack: number, q: number) {
  const s = c.createBufferSource();
  const f = c.createBiquadFilter();
  s.buffer = noise;
  s.loop = true;
  f.type = "bandpass";
  f.Q.value = q;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(f1, t + end);
  s.connect(f).connect(env(c, t, attack, peak, end));
  s.start(t, Math.random() * 2); // a different stretch of noise each time
  s.stop(t + end);
}

// The cues. Pitches sit in A (the drone's key): E5 and B5 for the overlays, A5 for the seed.
const voices: Record<Cue, (c: AudioContext, t: number) => void> = {
  // a short soft tick, pitched a hair differently each time so repeats do not sound stamped
  click: (c, t) => tone(c, t, 1700 * (0.94 + Math.random() * 0.12), 1000, 0.07, 0.12, 0.002, "triangle"),
  // barely there: a breath of air
  hover: (c, t) => air(c, t, 5200, 3600, 0.12, 0.07, 0.03, 0.8),
  // a rising breath under an open fifth; closing folds it back down
  open: (c, t) => {
    air(c, t, 600, 2800, 0.34, 0.2, 0.14, 1.4);
    tone(c, t + 0.03, 659.25, 659.25, 0.5, 0.06, 0.02);
    tone(c, t + 0.09, 987.77, 987.77, 0.55, 0.035, 0.02);
  },
  close: (c, t) => {
    air(c, t, 2600, 500, 0.26, 0.16, 0.05, 1.4);
    tone(c, t, 987.77, 659.25, 0.3, 0.045, 0.01);
  },
  // the opening's seed of light: a sine that blooms slowly and settles, a faint fifth above it
  seed: (c, t) => {
    tone(c, t, 870, 880, 2.6, 0.08, 0.5);
    tone(c, t + 0.2, 1320, 1320, 2.2, 0.025, 0.7);
  },
  // the band of light crossing the orb: filtered noise sweeping up
  wave: (c, t) => air(c, t, 280, 4200, 1.4, 0.5, 0.7, 1.6),
  // the hand-over: a low drone (A1, E2, A2) swelling while its filter opens and closes again
  swell: (c, t) => {
    const f = c.createBiquadFilter();
    f.Q.value = 1.1;
    f.frequency.setValueAtTime(120, t);
    f.frequency.exponentialRampToValueAtTime(1300, t + 1.9);
    f.frequency.exponentialRampToValueAtTime(200, t + 4.6);
    f.connect(env(c, t, 1.9, 0.1, 4.6));
    for (const hz of [55, 82.41, 110.3]) osc(c, t, hz, 1, f, "sawtooth").stop(t + 4.6);
  },
};
