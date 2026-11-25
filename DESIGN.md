---
name: Pedro Tortoriello
description: A cinematic portfolio in four acts, each set in the voice of one reference screenshot and held together by one token set, one label voice and one motion system.
colors:
  bg: "#000000"
  surface: "#0b0b0c"
  elevated: "#131314"
  raised: "#1b1b1d"
  charcoal: "#141414"
  fog: "#d9dadb"
  fog-deep: "#babdc0"
  line: "rgb(255 255 255 / 0.12)"
  line-strong: "rgb(255 255 255 / 0.24)"
  line-faint: "rgb(255 255 255 / 0.07)"
  ink: "#f3f3ef"
  ink-muted: "#a6a6a6"
  ink-faint: "#7f7f7f"
  accent: "#c2f55c"
  accent-deep: "#a8de36"
  on-accent: "#0a0a0a"
  violet: "#6e1bff"
  violet-soft: "#a98cff"
typography:
  hero:
    fontFamily: "Outfit"
    fontSize: "clamp(2.5rem, 5.5vw, 5.75rem)"
    fontWeight: 380
    lineHeight: 1.08
    letterSpacing: "-0.022em"
  wall:
    fontFamily: "Inter Tight"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
    textTransform: "uppercase"
  skills:
    fontFamily: "Tektur"
    fontWeight: 900
    lineHeight: 0.8
  stencil:
    fontFamily: "Big Shoulders Stencil"
    fontWeight: 800
    textTransform: "uppercase"
  finale:
    fontFamily: "Anybody"
    fontStyle: "italic"
    fontWeight: 800
    fontVariation: "'wdth' 140 (110 on phones)"
    lineHeight: 0.95
  serif:
    fontFamily: "Instrument Serif"
    fontStyle: "italic"
  body:
    fontFamily: "Inter Tight"
    fontSize: "1rem–1.125rem"
    lineHeight: 1.7
  label:
    fontFamily: "Geist Mono"
    fontSize: "0.6875rem"
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  panel: "0"
  tag: "9999px"
  dock: "9999px"
spacing:
  gutter: "clamp(1rem, 3.6vw, 3.5rem)"
  section: "clamp(5.5rem, 11vw, 10rem)"
  container: "1440px"
  header: "4.5rem"
---

# Design System: Pedro Tortoriello · V4 "Cinematic"

## Overview

The site is a short film in four acts, each one set after a reference screenshot Pedro chose, then a closing credit:

1. **Hero and intro (the orb).** Pure black. A holographic soap-bubble orb in WebGL sits in the middle; the headline is laid over it in Outfit; two small lines hold the bottom corners. Scrolling on, the orb steps aside (on phones it dims behind the text) and the intro statement lights up word by word, with "engineer" set in Instrument Serif italic.
2. **Work (the exhibition).** The only light surface on the site: a fog wall with black liquid forms at its edges, and a large black panel hanging on it. Inside, "//PRECISION / DRIVEN PROJECTS" in tight Inter Tight 800, mono labels in brackets, cards with in-house renders, outline pill tags, and the lime "View all projects" button.
3. **Skills (the technical wall).** Pure black. "SKILLS." in Tektur 900 with a violet period, four widely spaced columns headed in violet Big Shoulders Stencil, items in Tektur. The violet dock belongs to this reference and travels with the reader from here on.
4. **Experience (the ledger).** Black, Inter Tight uppercase companies, outlined stencil years, a São Paulo ↔ California time-zone bridge.
5. **Contact (the finale).** Charcoal lit green from the top-left corner. "Let's build / something / extraordinary." in Anybody italic at width 140, lime admission tickets tossed over it that follow the cursor, an outline arrow that writes to Pedro, Instrument Serif for the invitation, lime outline pills for the channels. The footer continues the same charcoal.

What keeps the acts one system: the token set below, the Geist Mono label voice (`[001]`, `[CASE STUDY]`, coordinates, readouts), the `//` slashes, one acting colour (lime), and one motion vocabulary.

## Colors

- **Black stage** (`bg`): hero, intro, skills, experience, case studies. Panels and cards add `surface`, `elevated`, `raised` in small steps.
- **Charcoal** (`charcoal`): the finale and the footer, with a dark-green radial bloom in the top-left corner.
- **Fog** (`fog`): only the work wall. The header uses `mix-blend-mode: difference`, so it stays legible over it.
- **Ink** (`ink`, `ink-muted`, `ink-faint`): off-white type in three steps. `ink-faint` is for labels only.
- **Hairlines** (`line`, `line-strong`, `line-faint`): white at an alpha, never a flat grey.
- **Lime** (`accent`): the one colour that acts. CTAs, link hovers, focus rings, live dots, the tickets, chips that follow the cursor, the selection colour. Text on lime is `on-accent`.
- **Violet** (`violet`, `violet-soft`): the technical layer only: skills headings and period, the dock, the active well. `violet` is reserved for type of 24px and up; smaller violet text uses `violet-soft`.
- **Orb palette** (shader only): cyan ↔ magenta through lavender and blue, with a blue Fresnel rim, never green or yellow in the hero. As the narrator companion the light (ribbons and rim, never the dark glass) is tinted by the act under it: violet in Skills, the orb's own palette slowed and dimmed in Experience, lime on dark glass at Contact and the footer; it hides over the light work wall.

### Named rules
**One acting colour.** If it is not an action, a live state, focus or the finale's tickets, it is not lime.
**Violet is architecture.** Violet marks the technical layer (skills, dock); it never marks an action outside the dock.

## Typography

Each act speaks in its reference's voice; Geist Mono is the shared voice of the machine.

| Role | Face | Where |
| --- | --- | --- |
| Hero, intro | Outfit 350–380, tight | the first two screens |
| Walls and titles | Inter Tight 800, uppercase, −0.045em | work heading, card titles, experience companies, case-study titles |
| Body | Inter Tight 400, 1.7 line height | every paragraph |
| Technical display | Tektur 900 / 400 | "SKILLS.", skill items, dock tooltips |
| Stencil | Big Shoulders Stencil 800 | skill column headings, experience years |
| Finale | Anybody italic 800, `wdth` 140 (110 on phones) | contact headline, footer name, small italic labels |
| Accent | Instrument Serif italic | "engineer" in the intro, the finale's invitation |
| Labels | Geist Mono 11px caps, 0.14em | indices, brackets, tags, readouts, coordinates |

Outfit, Inter Tight and Geist Mono preload; the other four load when their section needs them.

## Layout

A 1440px container with a fluid gutter (`clamp(1rem, 3.6vw, 3.5rem)`, 16px on phones). Sections breathe with `clamp(5.5rem, 11vw, 10rem)`. Compositions are asymmetric where the references are: the intro paragraph offsets one column, the work panel shows more fog on the right, the fourth case card spans two columns. Phones are composed on purpose: the work panel bleeds to the edges, the skills columns stack, the finale keeps its three lines by narrowing the font's width axis. Long sections leave room at the bottom for the dock.

## Components

- **Header:** "PT®" top-left, WORK / INTRO / SKILLS / CONTACT top-right in Outfit caps, difference-blended. The active link gets a hairline underline.
- **Dock:** a violet cartridge with bracket ears, hand-drawn line glyphs (home, user, cubes, ruler-and-pencil, branch, paper plane), a black well inside the bar under the active section (`m` layoutId), tooltips in Tektur that stay open while hovered and close on Escape. Hidden in the hero; always there off the home page.
- **Project card:** black, `line-strong` border, cover with a mask reveal and a 1.06 hover zoom on its own layer, a lime sheen, a lime "View case →" chip that follows the cursor (pointer devices), `[001]`, live dot, title, category, summary, outline tags.
- **Tickets:** lime admission tickets (notched), three variants (arrow, monogram, globe), inline SVG, cursor parallax by depth, gentle CSS float.
- **Case study:** full-bleed cover (or a muted product clip), sticky section index, numbered decisions, a system map with a lime ring on Pedro's parts and a "Play the flow" walkthrough of the data flow, readouts strip, co-authorship callouts, next-case link.
- **Header controls:** "Pause motion" (WCAG 2.2.2, `html.still`, remembered) and "Sound" (off by default, synthesized cues and a quiet drone), both 12px glyphs with `aria-pressed`.
- **Command layer:** a ⌘K / Ctrl K palette (sections, cases, actions), a terminal on the backquote key (`help`, `whoami`, `ls work`…), and "Ask the portfolio" (Claude, answers only from the site's own content; shown only when `ANTHROPIC_API_KEY` is set).
- **Live strip:** GitHub activity and the products' uptime in the work section (`/api/telemetry`, cached 10 minutes); a time-zone converter beside the São Paulo clock.

## Motion

| Layer | Owner |
| --- | --- |
| First paint (orb surfacing, masked headline lines, corner fades) | CSS keyframes with `--d` |
| Smooth scroll | Lenis, read by ScrollTrigger; off for reduced motion |
| Scroll and cursor | GSAP via data attributes in `MotionRoot` (`data-reveal`, `data-stagger`, `data-split`, `data-scrub-words`, `data-mask`, `data-parallax`, `data-magnetic`, `data-cursor-field`/`data-depth`, `data-chip-area`/`data-chip`) |
| Hero → intro | `StageMotion` (scrubbed: headline lifts, orb steps aside, then fades) |
| Orb | WebGL; pauses off screen, in hidden tabs and under "Pause motion"; adaptive resolution; one still frame for reduced motion. After the stage (768px and up) the same canvas moves into a small fixed companion bottom-right that follows the acts (uTint, uEnergy) |
| Component state | `motion/react` `m` components under `LazyMotion` (dock well, copy feedback) |
| Route change | `app/template.tsx` opacity fade; a cover morph between a work card and its case (React `ViewTransition`, `components/media/cover-morph.tsx`) |
| Scroll velocity | `--scroll-v` on `<html>` (MotionRoot, from Lenis), read by `[data-velocity]` media: a small skew and scale, fine pointers only |
| Pause | `html.still` (header toggle, `lib/still.ts`): loops settle, the orb freezes, clips pause |

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) for entrances, `cubic-bezier(0.65, 0, 0.35, 1)` for travel. The markup is always the finished state: no-JS, reduced motion and print show everything.

## The opening ("The Origin")

Every full load of the home page (English or Portuguese) opens in the dark (client-side navigation never replays it), on the same live orb the hero uses (one canvas, one shader; `lib/intro.ts` carries the values the GSAP timeline writes and the render loop reads):

1. **Darkness** — a pinpoint of light with a soft atmosphere and a thin anamorphic streak.
2. **Formation** — a swarm of particles (GL points in the orb's context, 1,400 on desktop, 520 on phones) leaves the seed on tilted orbits and spirals out to even spots on the shell, with eased acceleration.
3. **Emergence** — the sphere's light comes up in order: halo and Fresnel rim, then the iridescent film, studio reflections and the refracted back surface; the swarm fades into it.
4. **Energy** — a band of light sweeps the surface while a ripple bends the image (desktop only).
5. **Identity** — "PEDRO TORTORIELLO®" resolves from the centre (blur to sharp, tracking closing in), a hairline draws, "ENGINEERING THE FUTURE." decodes.
6. **Hand-over** — the orb grows into the hero's exact framing; the headline rises, the corners and the navigation arrive.

About 6.9s on desktop and 5.2s on phones (slowed on purpose). While shaders and fonts load, a Geist Mono counter 000 → 100 tracks real milestones and shrinks into the seed. With sound on, the seed, the wave and the hand-over each have a cue. "Skip intro" (bottom right), Escape, Enter, Space, scrolling or a swipe jump straight to the finished hero. It never plays for reduced motion, "Pause motion", slow or data-saving connections, background tabs, crawlers or audits, or links with a hash. Guards in `<head>` show the hero if the opening has not started within 3s or stalls past 16s. In development, `/?intro` forces it and `window.__opening` scrubs it.

## Imagery

Every image is real or rendered in-house: the portrait is Pedro's photo; the covers and the work wall are ray-marched scenes from `scripts/imagery/lab.html` (pale fog, chrome, black gloss, one lime emission), saved as WebP at 1920×1280 (the wall at 2400×1600). Cases with a public page also have a 12s muted clip recorded from that page without logging in (`scripts/clips/record.mjs`, `lib/videos.ts`), its first frame as the poster. No stock photography.

## Do's and Don'ts

- **Do** keep lime as the only acting colour and violet for the technical layer.
- **Do** set labels in Geist Mono caps with brackets or slashes; never as an eyebrow above every heading.
- **Do** keep each act in its reference's typeface; don't mix the acts' display faces inside one section.
- **Do** make the finished state the default markup.
- **Don't** add rounded cards, glassmorphism, decorative gradients or skill bars.
- **Don't** put text in images or set small text in `violet` or `ink-faint` below 11px.
- **Don't** claim results the repositories cannot show; label co-authored work.

The law-firm page (`/landing-pages/advocacia`) keeps the previous V3 "Papel de segurança" system, isolated in `app/landing-pages/advocacia/paper.css`.
