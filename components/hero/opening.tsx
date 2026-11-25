"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/client";
import { HERO, START, opening, orbStatus, whenOrbReady } from "@/lib/intro";
import { loadGsap } from "@/lib/motion";
import { playCue, type Cue } from "@/lib/sound";

const COPY = {
  en: { tagline: "Engineering the future.", skip: "Skip intro" },
  pt: { tagline: "Projetando o futuro.", skip: "Pular abertura" },
} as const;

// How long the opening waits for the fonts before it plays anyway (fallback faces swap in).
const FONT_WAIT = 1500;

// Hands the page to the hero: the orb back at rest, the CSS state swapped
// (html.intro-done keeps the hero's first-paint entrances from replaying).
function endOpening() {
  const root = document.documentElement;
  Object.assign(opening, HERO, { active: false });
  root.classList.add("intro-done");
  root.classList.remove("intro");
}
let endTimer: number | undefined;

// "The Origin": the first visit of a session opens in the dark. A counter
// while the shaders and fonts load, a seed of light, a swarm that spirals out
// and draws a sphere, the glass coming up rim first, an energy wave through
// it, the name, and then the same live orb settles into the hero's framing
// while the headline rises and the navigation arrives. ~6.9s (~5.2s on
// phones) after the counter, skippable at any moment. Sound cues mark the
// seed, the wave and the hand-over.
//
// The inline script in app/layout.tsx decides before first paint (html.intro)
// and app/globals.css holds the hero off stage meanwhile. This component only
// orchestrates; the orb reads lib/intro.ts every frame.
export function Opening() {
  const copy = COPY[useLocale()];
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    window.clearTimeout(endTimer); // React's dev remount: carry on instead of ending
    if (!root.classList.contains("intro")) return;

    let cancelled = false;
    let done = false;
    let skipping = false; // a skip runs the timeline to its end: no cue may sound on the way
    let tl: { progress: (v: number) => unknown; kill: () => unknown } | null = null;
    let clear = () => {};
    let countRaf = 0;

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(countRaf);
      endOpening();
      clear();
      off();
    };
    const skip = () => {
      skipping = true;
      if (tl)
        tl.progress(1); // jumps every tween to its end, then onComplete runs finish
      else finish();
    };
    // The opening's sounds (silent unless the visitor turned sound on, lib/sound.ts).
    const cue = (c: Cue) => {
      if (!skipping) playCue(c);
    };

    // Any intent to move on ends the opening: scrolling, the keyboard, the button.
    const stop = (e: Event) => {
      if (done) return;
      e.preventDefault();
      e.stopPropagation(); // Lenis listens on window too; it must not scroll under the opening
      skip();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " ", "ArrowDown", "PageDown", "End"].includes(e.key)) stop(e);
    };
    const capture = { capture: true, passive: false } as const;
    const button = skipRef.current;
    window.addEventListener("wheel", stop, capture);
    window.addEventListener("touchmove", stop, capture);
    window.addEventListener("keydown", onKey, capture);
    window.addEventListener("scroll", skip, { passive: true });
    window.addEventListener("pt:intro-end", skip); // the <head> guard timers
    button?.addEventListener("click", skip);
    const off = () => {
      window.removeEventListener("wheel", stop, capture);
      window.removeEventListener("touchmove", stop, capture);
      window.removeEventListener("keydown", onKey, capture);
      window.removeEventListener("scroll", skip);
      window.removeEventListener("pt:intro-end", skip);
      button?.removeEventListener("click", skip);
    };

    // Opened in a background tab: nobody is watching, go straight to the hero.
    // (dev: /?intro forces the opening even in a hidden preview, to test it)
    if (document.hidden && !(window as Window & { __ptIntroForce?: boolean }).__ptIntroForce) {
      finish();
      return () => {
        cancelled = true;
      };
    }

    // The counter, 000 → 100, while the opening waits: it moves only on real milestones
    // (the fonts, the GSAP chunks, the shaders compiled, the first frame drawn), eased so a
    // fast load still reads as a count, then the timeline folds it into the seed of light.
    // The <head> guards bound the wait as before: past them the hero shows and this hides.
    const count = document.querySelector<HTMLElement>("[data-opening-count]");
    const got = { fonts: false, chunks: false };
    let landed = () => {};
    const counted = new Promise<void>((resolve) => (landed = resolve));
    let shown = 0;
    let before = 0;
    const tick = (now: number) => {
      const dt = before ? Math.min((now - before) / 1000, 0.1) : 0;
      before = now;
      const reached = 25 * (Number(got.fonts) + Number(got.chunks) + Number(orbStatus.compiled) + Number(orbStatus.ready));
      // eased toward what is reached, never past it; at least 30 a second, so the last steps land
      shown = Math.min(reached, shown + (reached - shown) * (1 - Math.exp(-dt / 0.12)) + dt * 30);
      if (count) count.textContent = String(Math.floor(shown)).padStart(3, "0");
      if (shown >= 100) landed();
      else countRaf = requestAnimationFrame(tick);
    };
    countRaf = requestAnimationFrame(tick);

    const fonts = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, FONT_WAIT))]).then(() => {
      got.fonts = true;
    });
    const chunks = Promise.all([loadGsap(), import("gsap/ScrambleTextPlugin")]);
    chunks
      .then(() => {
        got.chunks = true;
      })
      .catch(() => {}); // the Promise.all below hands a failure over to finish

    Promise.all([chunks, whenOrbReady(), fonts])
      .then(async ([[{ gsap, SplitText }, { ScrambleTextPlugin }], ok]) => {
        if (cancelled || done) return;
        // No WebGL (or it failed), or the <head> guard already handed over: the hero, at once.
        if (!ok || !root.classList.contains("intro")) return finish();
        // Committed: the <head> start guard stands down while the counter lands (a few tenths of a second).
        (window as Window & { __ptIntro?: boolean }).__ptIntro = true;
        await counted;
        if (cancelled || done) return;
        gsap.registerPlugin(ScrambleTextPlugin);

        const q = (s: string) => document.querySelector<HTMLElement>(s);
        const name = q("[data-opening-name]");
        const line = q("[data-opening-line]");
        const tag = q("[data-opening-tag]");
        const header = q("header");
        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-copy] .mask-line > span");
        const corners = gsap.utils.toArray<HTMLElement>("[data-hero-copy] .enter-fade");
        if (!name || !line || !tag) return finish();
        const small = matchMedia("(max-width: 767px), (pointer: coarse)").matches;
        const chars = SplitText.create(name, { type: "chars" }).chars;
        const handedOver = [...heroLines, ...corners, header].filter((el): el is HTMLElement => el !== null);
        clear = () => gsap.set(handedOver, { clearProps: "transform,opacity,visibility" });

        Object.assign(opening, START, { active: true });
        gsap.set([name, line, tag], { autoAlpha: 1 });
        gsap.set(chars, { autoAlpha: 0, yPercent: 55, filter: "blur(10px)" });
        gsap.set(line, { scaleX: 0 });
        const tagline = tag.textContent ?? ""; // rendered in the page's language; the scramble decodes it
        tag.textContent = "";

        const t = gsap.timeline({
          onComplete: finish,
          defaults: { ease: "power2.out" },
        });
        t
          // 00 the counter folds into the point where the light will be
          .to(count ?? [], { autoAlpha: 0, scale: 0.4, filter: "blur(4px)", duration: 0.45, ease: "power2.in" }, 0)
          // 01 darkness: a seed of light
          .to(opening, { point: 1, duration: 0.6 }, 0.15)
          .call(cue, ["seed"], 0.15)
          .fromTo(button, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.5)
          // 02 formation: the swarm spirals out to the shell, with controlled acceleration
          .to(opening, { dust: 1, duration: 0.45, ease: "power1.out" }, 0.45)
          .to(opening, { form: 1, duration: 1.5, ease: "power2.inOut" }, 0.45)
          .to(opening, { point: 0, duration: 0.5, ease: "power2.in" }, 1.45)
          // 03 emergence: the glass comes up, rim first, as the swarm settles into it
          .to(opening, { reveal: 1, duration: 1.05 }, 1.45)
          .to(opening, { dust: 0, duration: 0.7, ease: "power2.in" }, 1.8);
        // 04 energy: a wave through the sphere (phones skip it: less GPU, less motion)
        if (!small)
          t.fromTo(
            opening,
            { wave: 0 },
            {
              wave: 1,
              duration: 0.95,
              ease: "power1.inOut",
              immediateRender: false,
            },
            2.15,
          )
            .call(cue, ["wave"], 2.15)
            .set(opening, { wave: -1 }, 3.11);
        t
          // 05 identity: the name resolves from the centre, a hairline, the tagline decodes
          .to(
            chars,
            {
              autoAlpha: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "expo.out",
              stagger: { each: 0.035, from: "center" },
            },
            2.35,
          )
          .fromTo(name, { letterSpacing: "0.62em" }, { letterSpacing: "0.32em", duration: 1.4, ease: "expo.out" }, 2.35)
          .to(line, { scaleX: 1, duration: 0.85, ease: "expo.inOut" }, 2.55)
          .to(
            tag,
            {
              scrambleText: {
                text: tagline,
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_",
                speed: 0.6,
              },
              duration: 0.95,
              ease: "none",
            },
            2.65,
          )
          // 06 hand-over: the same orb grows into the hero's framing; the hero arrives
          .to(
            [name, line, tag],
            {
              autoAlpha: 0,
              y: -14,
              filter: "blur(6px)",
              duration: 0.5,
              ease: "power2.in",
              stagger: 0.05,
            },
            3.5,
          )
          .to(
            button,
            {
              autoAlpha: 0,
              duration: 0.3,
              // focus on the button moves to the page before it hides (on skip, tl.progress(1) fires this too)
              onComplete: () => {
                if (document.activeElement === button) document.getElementById("content")?.focus({ preventScroll: true });
              },
            },
            3.5,
          )
          .to(opening, { scale: 1, duration: 1.1, ease: "expo.inOut" }, 3.45)
          .call(cue, ["swell"], 3.45)
          // y: 0 drops the px offset GSAP reads from the CSS hold (translate3d 110%); yPercent does the move
          .fromTo(
            heroLines,
            { y: 0, yPercent: 110 },
            {
              y: 0,
              yPercent: 0,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.12,
            },
            3.95,
          )
          .fromTo(corners, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 4.15)
          .fromTo(header, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 4.15);
        // slowed on purpose (Pedro, 2026-11-24): every phase gets time to land
        t.timeScale(small ? 0.95 : 0.72);
        tl = t;
        // dev only: scrub the opening by hand (window.__opening.pause().progress(.4))
        if (process.env.NODE_ENV !== "production") (window as Window & { __opening?: unknown }).__opening = t;
      })
      .catch(finish); // a failed chunk or a throw: never leave the hero hidden

    return () => {
      cancelled = true;
      cancelAnimationFrame(countRaf);
      tl?.kill();
      off();
      // A real unmount mid-way (leaving the page): hand over. React's dev remount cancels this.
      if (!done) endTimer = window.setTimeout(endOpening, 120);
    };
  }, []);

  return (
    <>
      <div
        data-opening
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] flex-col items-center justify-center px-[var(--gutter)] text-center"
      >
        {/* the counter sits on the exact centre, where the seed of light appears; the left pad offsets the tracking after the last digit */}
        <p
          data-opening-count
          className="tabular absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pl-[0.42em] font-mono text-[0.6875rem] tracking-[0.42em] text-white/55"
        >
          000
        </p>
        <p
          data-opening-name
          className="invisible font-geo text-[clamp(1.05rem,2.5vw,2.3rem)] font-light uppercase tracking-[0.32em] text-white"
        >
          Pedro Tortoriello
          <span className="ml-[0.08em] align-super text-[0.42em] tracking-normal">®</span>
        </p>
        <span
          data-opening-line
          className="invisible mt-5 block h-px w-[min(26rem,62vw)] bg-linear-to-r from-transparent via-white/45 to-transparent"
        />
        <p
          data-opening-tag
          className="invisible mt-5 min-h-[1.5em] font-mono text-[0.6875rem] uppercase tracking-[0.42em] text-white/75 sm:text-xs"
        >
          {copy.tagline}
        </p>
      </div>
      <button
        ref={skipRef}
        data-opening-skip
        type="button"
        className="invisible fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[var(--gutter)] z-[61] min-h-11 items-center gap-2 px-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white"
      >
        {copy.skip} <span aria-hidden>→</span>
      </button>
    </>
  );
}
