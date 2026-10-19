---
name: Pedro Tortoriello
description: Engineering portfolio rendered as a working engineer's environment: terminal, editor, architecture graph.
colors:
  field: "#07090d"
  surface: "#0d1118"
  elevated: "#121925"
  raised: "#182131"
  line: "rgb(148 163 184 / 0.16)"
  line-strong: "rgb(148 163 184 / 0.28)"
  line-faint: "rgb(148 163 184 / 0.08)"
  ink: "#f2f5fa"
  ink-muted: "#929dad"
  ink-faint: "#7a8596"
  blue: "#4388ff"
  blue-fill: "#2d6cea"
  blue-deep: "#1d4fb8"
  cyan: "#46d9ff"
  green: "#65e6a5"
  amber: "#e6c07b"
  sx-keyword: "#82aaff"
  sx-function: "#46d9ff"
  sx-string: "#e6c07b"
  sx-number: "#f4a97c"
  sx-type: "#a9c8ff"
  sx-comment: "#7a8798"
  sx-punct: "#8a96a8"
  sx-ident: "#d6deeb"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.55rem, 4.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    fontFeature: "\"ss01\", \"cv11\""
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 2
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
  hud:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.12em"
  section-index:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.76rem"
    fontWeight: 400
    letterSpacing: "0.14em"
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
rounded:
  hairline: "3px"
  chip: "6px"
  control: "8px"
  button: "10px"
  window: "12px"
  panel: "16px"
  device: "1.6rem"
  pill: "9999px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  section: "clamp(5rem, 10vw, 8.5rem)"
  container: "1240px"
  header: "64px"
components:
  button-primary:
    backgroundColor: "{colors.blue-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.elevated}"
  button-ghost:
    textColor: "{colors.ink-muted}"
    padding: "0 4px"
    height: "36px"
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.chip}"
    padding: "8px 12px"
  nav-link-active:
    textColor: "{colors.ink}"
  chip-tech:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.code}"
    rounded: "{rounded.chip}"
    padding: "4px 8px"
  pill-status:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  window:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.window}"
  panel-case:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "32px"
  panel-stack:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.window}"
---

# Design System: Pedro Tortoriello

## Overview

**Creative North Star: "The Engineer's Workspace in Session"**

The page is a dark development environment that happens to be a portfolio. Every section is a working instrument (terminal, editor window, architecture graph, request lifecycle, git-graph career log, CI pipeline, build console) and each one renders Pedro's real work. Depth comes from layered near-black surfaces separated by cool slate hairlines, lit by a single electric blue. The world is calm and precise: large tightly tracked Geist statements carry the voice, Geist Mono carries the machine.

Effects exist only where an engineering environment would have them: a faint 28px dot texture across the page, a 56px technical grid and radial blue light pools behind the hero and route headers, a top-light sheen and deep soft drop on floating windows, packets travelling along live connections. Motion is one orchestrated boot sequence in the hero, then quiet opt-in scroll reveals. Nothing animates off screen, and everything has a reduced-motion and a print path.

Rejected (PRODUCT.md anti-references): blue-to-purple gradient text, glassmorphism on every card, hero-metric clichés, a tracked uppercase eyebrow above every section, skill bars, "Hi I'm X", emoji.

**Key Characteristics:**
- Deep blue-black field with three tonal surface steps; hairlines, not fills, draw structure.
- One action colour (electric blue); cyan and green are semantic signals, never decoration.
- Geist for statements and content; Geist Mono only for code, terminal, paths, data and HUD labels.
- A fixed diagram line vocabulary shared by every graph, with a legend.
- Interface windows as the signature container.

## Colors

A cold, near-monochrome slate world with one electric blue and two strictly semantic signal colours.

### Primary
- **Electric Blue** (`blue`): the only action and emphasis colour. Links on hover, the active nav underline, the blinking caret, the section index "0N //", focus rings, selection tint, icons in the specialties rail, ring of nodes built by Pedro, active graph paths, light pools and the pointer-tracked edge light.
- **Button Blue** (`blue-fill`): the solid fill behind white text on primary buttons and the mobile CV button. Exists because Electric Blue is too light for white text contrast.
- **Deep Blue** (`blue-deep`): reserved darker step of the same hue.

### Secondary
- **Signal Cyan** (`cyan`): only on live data flow: travelling packets on stack and pipeline connectors, async edges in the request lifecycle, job nodes and pulses in graphs, function names in syntax.

### Tertiary
- **Terminal Green** (`green`): only on success and liveness: availability dot, terminal prompt and `exit 0`, build-console ticks, "copied" check, education status, ok steps in the request lifecycle.

### Neutral
- **Night Field** (`field`): page background, scrollbar track, mobile menu sheet.
- **Surface** (`surface`): windows, panels, chips, nodes at rest; often at 50-80% opacity over the field.
- **Elevated** (`elevated`): window title bars and status bars, secondary-button hover.
- **Raised** (`raised`): highest tonal step.
- **Hairline / Strong / Faint** (`line`, `line-strong`, `line-faint`): structural borders, secondary-button and device borders, the quietest dividers.
- **Ink / Muted / Faint** (`ink`, `ink-muted`, `ink-faint`): headings and primary text; body and second headline line; labels, captions, HUD.
- **Syntax set** (`sx-*`, plus `amber` for strings): code and JSON only.

### Named Rules
**The One Blue Rule.** Electric Blue is the only colour that means "act here" or "look here". No second accent, no gradient text.

**The Signal Rule.** Cyan appears only where data is moving; green only where something succeeded or is live. If it is not flowing or not a success, it is slate or blue.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist, with stylistic sets ss01 and cv11 enabled
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo)

**Character:** A single grotesk at medium weight with aggressive negative tracking gives the statements mass; its mono sibling reads as the environment talking.

### Hierarchy
- **Display** (500, clamp(2.55rem, 4.6vw, 4rem), 0.98, -0.045em): hero headline only, in mask-revealed lines; the second line in ink-muted.
- **Headline** (500, clamp(2rem, 4.4vw, 3.6rem), 1.03, -0.035em, max 20ch, balanced): the section statement, always the h2.
- **Title** (500, 0.95rem, -0.01em): rail items, card and node titles.
- **Body** (400, 1rem, 1.75 line-height, pretty wrap, max ~28rem in leads): leads and descriptions. Hero lead steps up to 1.125rem / 2.
- **Label** (500, 0.6875rem, 0.1em, uppercase, ink-faint, sans): content labels such as "Problema" or "Solução".
- **HUD** (mono, 0.6875rem, 0.12em, uppercase, ink-faint): names a system part, path, tier or measurement.
- **Code** (mono, ~0.66-0.72rem): code, terminal, window titles, status bars, tech chips, legends.

### Named Rules
**The Mono Means Machine Rule.** Mono is used only for code, terminal output, file paths, data and HUD labels. A label about content uses the sans `.label`.

**The Statement First Rule.** A section opens with its statement as the heading; the "0N // TITLE" index sits beside it on desktop and below it on phones, never above it.

## Layout

Centered container (max 1240px, gutter clamp(1rem, 4vw, 2.5rem)); section rhythm clamp(5rem, 10vw, 8.5rem); fixed 64px header with 80px scroll margin on anchored sections. Major compositions sit on an asymmetric 12-column grid at `lg` (1024px).

Section header: a hairline rule draws in across the width (with an optional HUD meta at the right from `md`), then a two-column grid at `lg` (1.15fr / 0.85fr) with the statement left and the index plus lead right-aligned; single column below.

Responsive recompositions observed in the build:
- Hero: 7/5 split at `xl`, 6/6 at `lg`, stacked below. The CadenceFlow editor window behind the terminal appears only at `xl`; pointer parallax only from `lg`. The background service graph runs at 50% opacity below `lg`. Corner HUD marks only at `xl`.
- Specialties rail: 2x2 hairline grid on phones, a 4-up row at `lg`, inside the first fold.
- Career log: 8/4 columns at `lg` with a sticky education aside; stacked below.
- Stack: layered panels with connector columns (`1fr 2.25rem` repeats) at `lg`; vertical connectors when stacked.
- Header nav collapses to a full-height sheet under 768px; it closes automatically when the viewport grows.

## Elevation & Depth

Hybrid: tonal layering (field, surface, elevated, raised) carries most depth; real shadows are reserved for objects that float above the page. Floating things get a faint inset top light plus a long, soft, dark drop. Glow appears only as blue light: the primary button's halo, the radial light pools, and the hover edge light.

### Shadow Vocabulary
- **Window float** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.04) inset, 0 24px 48px -12px rgb(0 0 0 / 0.6), 0 48px 96px -24px rgb(4 10 24 / 0.7)`), plus a 120px top sheen gradient: every interface window.
- **Device float** (`0 30px 60px -20px rgb(0 0 0 / 0.8), 0 0 0 1px rgb(255 255 255 / 0.03) inset`): the browser frame around landing-page screenshots.
- **Card stack** (`0 20px 40px -16px rgb(0 0 0 / 0.9)`): fanned screenshots in the landing-page teaser.
- **Primary halo** (`inset 0 1px 0 rgb(255 255 255 / 0.18), 0 0 0 1px rgb(67 136 255 / 0.6), 0 8px 24px -8px rgb(45 108 234 / 0.7)`; stronger on hover): primary button only.

### Named Rules
**The Floating Instrument Rule.** Only windows, device frames and stacked screenshots cast shadows. Panels and cards stay flat on a hairline and light their edge on hover instead.

## Shapes

Softly rounded technical forms, radius stepping with size: 3px swatches, 6px chips and tabs, 8px controls, 10px buttons, 12px windows and stack panels, 16px case and landing-page panels, 1.6rem device frames (1.2rem inner), full pills for status and timeline dots. Diagram nodes are 9px-radius rectangles. Borders are always 1px hairlines; dashed hairlines mark an empty or "more to come" slot. Panels clip their content (`overflow: hidden`).

## Components

### Buttons
Precise and lit from within.
- **Shape:** gently rounded (10px), 44px tall, 20px side padding, 14px medium text, icon gap 8px.
- **Primary:** Button Blue fill, white text, inset top light, 1px blue ring and a soft blue halo that intensifies on hover. Trailing arrow nudges right on hover.
- **Secondary:** strong hairline border over translucent surface; on hover the border turns blue at 60% and the fill steps to elevated.
- **Ghost:** muted text that brightens to ink.
- **Press:** all variants drop 1px on active.
- **Text link:** ink text, an underline that grows from 0 to 100% on hover, colour shifts to blue, trailing out-arrow.

### Chips
- **Tech chip:** 6px radius, hairline border, translucent surface, mono 0.68rem muted text.
- **Role / status pill:** full radius, hairline border; the hero availability pill carries a pinging green dot.
- **Niche link chip:** 6px radius hairline that turns blue on hover.

### Cards / Containers
- **Corner Style:** 16px for case and landing-page panels, 12px for stack panels.
- **Background:** surface at 50-80% opacity over the field.
- **Shadow Strategy:** flat; see the Floating Instrument Rule.
- **Border:** 1px hairline, stepping to strong on hover; a pointer-tracked blue edge light (radial, 420px) fades in on hover and focus-within.
- **Internal Padding:** 20px on phones to 32-40px on desktop.

### Navigation
Fixed 64px header, transparent at the top, then field at 80% with heavy backdrop blur and a hairline once scrolled. Logo is a monogram tile (mono initials, blue status dot) plus name and a mono `~/section` breadcrumb at `xl`. Links are 0.84rem muted text; the active one turns ink with a 2px blue underline that slides between items (scroll-spy on home, route-based elsewhere). A hairline CV button sits right. Under 768px a hamburger opens a full-height sheet of hairline-divided rows with mono indices and a solid blue CV button; the rest of the page is inert while it is open.

### Interface Window (signature)
A development-tool window: 40px title bar on elevated with three traffic-light dots and a mono file title, optional 28px mono status bar, body on surface with the Window float shadow and 12px radius. Used for the terminal, code excerpts, build console and case instruments. The terminal types its lines with a blinking blue block cursor, prompt in green, and reports `running` (blue dot) then `exit 0` (green dot).

### Architecture Graph (signature)
SVG graph on tiers with dotted tier guides and HUD tier names. Edges follow the line vocabulary: **solid = synchronous** (draws in), **dashed 6/5 = async, queue, cron**, **dotted 1.5/4.5 round = external integration** (fade in). Nodes are surface rectangles with a tone dot, title and mono subtitle; **a blue ring and 7% blue wash = built by Pedro**. Hovering or tabbing onto a node isolates its direct connections in blue, dims everything else, and writes the node's explanation in the caption. A shared legend sits beside every graph. Packets travel along edges only when motion is allowed.

### Motion grammar
Easing `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, `cubic-bezier(0.65, 0, 0.35, 1)` for travel. Hero boot: headline lines mask up, windows rise and settle, the terminal types, the graph draws in, staggered via a `--d` delay. Below the fold, content is visible by default; JS opts the page into reveals (20px rise and fade, rules scale in from the left, diagram edges draw in, build lines print in sequence). Pulses and connector packets are paused until in view. Under reduced motion every animation completes instantly and pulses are removed; in print every unrevealed block is forced visible.

## Do's and Don'ts

### Do:
- **Do** keep Electric Blue as the only action and emphasis colour, and use Button Blue for any fill that carries white text.
- **Do** reserve cyan for moving data and green for success or liveness.
- **Do** open every section with the statement as the h2 and the "0N // TITLE" mono index beside it.
- **Do** draw every diagram with the solid / dashed / dotted vocabulary, ring Pedro's own nodes in blue, and show the legend.
- **Do** put code, terminal output and paths in a window with a real file path and real line numbers.
- **Do** make content visible by default and opt it into motion from JS; pause loops off screen; ship a reduced-motion and a print path.
- **Do** separate surfaces with 1px slate hairlines and tonal steps rather than shadows.

### Don't:
- **Don't** use mono for content labels; use the sans label style.
- **Don't** place a tracked uppercase eyebrow above a heading.
- **Don't** use gradient text, glassmorphism on cards, or a second accent hue.
- **Don't** give flat panels or cards a drop shadow; only floating instruments cast one.
- **Don't** run animations while their element is off screen or without a reduced-motion fallback.
