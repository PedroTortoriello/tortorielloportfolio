import { Intro } from "@/components/sections/intro";
import { content, type Locale } from "@/lib/i18n";
import { Opening } from "./opening";
import { Orb } from "./orb";
import { StageMotion } from "./stage-motion";
import s from "./stage.module.css";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// The first screen, after the hero reference: black, the orb in the middle,
// the headline laid over it, two small lines in the bottom corners. The orb
// layer is sticky across hero and intro, so the intro arrives in its light.
// After the stage the orb's canvas moves into the companion box, the narrator
// in the bottom-right corner (orb.tsx), and comes back here at the top.
export function Stage({ locale = "en" }: { locale?: Locale }) {
  const { hero, profile } = content(locale);
  return (
    <div data-stage className="relative bg-bg">
      <div aria-hidden className="pointer-events-none sticky top-0 h-svh overflow-hidden">
        <div data-orb-out className="absolute inset-0">
          <div data-orb-dim className="absolute inset-0">
            {/* GSAP moves the outer layer; the CSS entrance runs on the inner one, so neither reads the other's transform */}
            <div data-orb-move className="absolute inset-0">
              <div data-orb-enter className={`absolute inset-0 ${s.enter}`}>
                <div data-intro-hide className={s.poster} />
                <Orb className={s.canvas} boxClassName={s.companion} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="top" aria-labelledby="hero-title" className="relative z-10 -mt-[100svh] flex h-svh min-h-[34rem] flex-col">
        <div data-hero-copy className="container-x flex flex-1 items-center justify-center pt-[var(--header-h)]">
          <h1
            id="hero-title"
            className="max-w-[15ch] text-balance text-center font-geo text-[clamp(2.5rem,5.5vw,5.75rem)] font-[380] leading-[1.08] tracking-[-0.022em] text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.45)] sm:max-w-none"
          >
            <span className="sr-only">
              {profile.name}, {profile.role}.{" "}
            </span>
            <span className="mask-line">
              <span style={d(350)}>{hero.headline[0]}</span>
            </span>
            <span className="mask-line">
              <span style={d(480)}>{hero.headline[1]}</span>
            </span>
          </h1>
        </div>
        <div data-hero-copy className="container-x">
          <div
            className="enter-fade flex items-end justify-between gap-6 pb-6 font-geo text-[0.6875rem] font-medium uppercase leading-[1.5] tracking-[0.16em] text-white/85 sm:pb-8 sm:text-[0.75rem]"
            style={d(1100)}
          >
            <p className="max-w-[48%]">
              {hero.left[0]} <span className="text-white/40">/</span> {hero.left[1]}
            </p>
            <p className="max-w-[48%] text-right">{hero.right}</p>
          </div>
        </div>
      </section>

      <Intro locale={locale} />
      <StageMotion />
      <Opening />
    </div>
  );
}
