---
name: Pedro Tortoriello
description: A control room for the systems Pedro put into production.
colors:
  field: "#080b10"
  surface: "#111925"
  elevated: "#15202f"
  raised: "#1b2939"
  structure: "#244561"
  line: "rgb(53 92 126 / 0.42)"
  line-strong: "rgb(74 120 160 / 0.62)"
  line-faint: "rgb(36 69 97 / 0.34)"
  ink: "#e8edf4"
  ink-muted: "#a3afbf"
  ink-faint: "#7c8aa0"
  blue: "#5e9eff"
  blue-bright: "#8dbaff"
  on-blue: "#06101f"
  green: "#6ee7b0"
  amber: "#e6c07b"
  sx-kw: "#8db8ff"
  sx-fn: "#7fc8ff"
  sx-str: "#e6c07b"
  sx-num: "#f0a988"
  sx-type: "#b9d3ff"
  sx-com: "#7484a0"
  sx-punct: "#8a9ab0"
  sx-id: "#d9e2ee"
typography:
  display:
    fontFamily: "Hubot Sans, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 6.3vw, 5.6rem)"
    fontWeight: 760
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Hubot Sans, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 104"
  title:
    fontFamily: "Hubot Sans, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    fontFeature: "'ss01', 'cv11'"
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
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
    lineHeight: 1.1
    letterSpacing: "0.12em"
  readout:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.375
  code:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  hairline: "4px"
  chip: "5px"
  console: "6px"
  window: "8px"
  node: "9999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(6rem, 12vw, 10rem)"
  container: "1320px"
  console-head: "2.5rem"
  console-pad: "0.875rem"
  grid-minor: "24px"
  grid-major: "120px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.console}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blue-bright}"
    textColor: "{colors.on-blue}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.console}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.elevated}"
  button-ghost:
    textColor: "{colors.ink-muted}"
    padding: "0 4px"
    height: "36px"
  console:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.console}"
  console-head:
    textColor: "{colors.ink-faint}"
    typography: "{typography.hud}"
    padding: "0 14px"
    height: "{spacing.console-head}"
  window:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.window}"
  chip-role:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "4px 10px"
  readout:
    textColor: "{colors.ink}"
    typography: "{typography.readout}"
    padding: "16px"
  nav-header:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink-muted}"
    height: "64px"
---

# Design System: Pedro Tortoriello

## Overview

**Creative North Star: "The Control Room"**

The site is a flight control room for systems that are running in production. The page is a dark night field, and the work sits on it as consoles: flat hairline frames with blue registration ticks on their corners, a mono header strip naming what they read, and readouts printed from the real code. Structure is drawn in a muted structural blue (bezels, datum lines that run past their corners, rulers, graph edges). One luminous blue is the only light. It marks what is live, what is active, what can be acted on, and the line of the mission itself.

The whole page is one mission. A trajectory line runs through the gutter from station to station, drawn by the scroll. Each section opens like a title card: a ruler draws across from a station node on that line, then the statement cuts in line by line in wide Hubot Sans. A fixed index rail and a progress hairline under the header show where you are in the running order. Geist carries the reading. Geist Mono carries the machine: readouts, HUD labels, paths, code.

Depth is architectural, not atmospheric. A drafting grid, datums and a ruler sit behind the front wall, and a crosshair follows the pointer. Only floating instruments (code windows, browser frames, the iPhone mockup, the operator portrait) cast a drop. Motion means something: the wall boots, lines draw, consoles power on, readouts land with a bloom. Reduced motion and no-JS show the finished state.

**Key Characteristics:**
- Night field (#080b10) with console surfaces; structural-blue hairlines draw every edge, and no grey borders are used.
- One light: luminous blue for live, active, primary action, the mission line and bloom. Green appears only as a success result inside code instruments.
- Wide Hubot Sans for wall titles, Geist for reading, Geist Mono for readouts, HUD, indices and code.
- Consoles with corner registration ticks are the signature container. Floating windows and devices are the only things with a drop shadow.
- One mission line through every station, drawn by the scroll and mirrored by a fixed index rail.

## Colors

A cold night palette: blue-black field, blue-tinted surfaces, structural-blue construction lines, and one luminous blue.

### Primary
- **Luminous Blue** (`blue`): The only light. Used for the primary button fill (with dark ink), live and availability dots, active nav and rail states, station nodes, the mission line and progress hairline, the section index number, focus rings, and the bloom on printed readouts. In graphs it rings the parts Pedro built.
- **Bright Blue** (`blue-bright`): The hot end of the light. Used for primary hover, the specialty text in the hero role line, the far end of gradients on the trajectory, and moving packets on connectors. The `cyan` token is an alias of this value and survives only as the packet colour.
- **On-Blue Ink** (`on-blue`): The dark ink set on any blue fill, so primary actions pass AA.

### Neutral
- **Night Field** (`field`): Page background, theme colour, and the knockout ring around station nodes.
- **Console Surface** (`surface`): Console bodies (at 72% opacity on consoles), windows, and unselected graph nodes.
- **Elevated** (`elevated`) / **Raised** (`raised`): Header strips of windows and the portrait console, status bars, secondary button hover, and the hovered graph node.
- **Structural Blue** (`structure`): Construction lines: datums, ruler ticks, the crosshair, graph node strokes and tracks.
- **Hairline** (`line`), **Strong Hairline** (`line-strong`), **Faint Hairline** (`line-faint`): Every border and divider, in structural-blue alphas. Use strong for secondary buttons, chips and inactive rail nodes. Use faint for list rules and the dim track under the mission line.
- **Ink** (`ink`), **Muted Ink** (`ink-muted`), **Faint Ink** (`ink-faint`): Headings and values; reading text; HUD and labels.

### Code-only
- **Success Green** (`green`): Only inside code instruments, as a result (the PIX checksum that makes the payload valid, the request step that succeeds).
- **Syntax set** (`amber`, `sx-*`): Only in code blocks. Amber is the string colour, so it is never used for labels outside code.

### Named Rules
**The One Light Rule.** Luminous blue is the only light on the page. If something is not live, active, actionable or the mission line, it is ink or structure.

**The Green Is a Result Rule.** Green means "this check passed" inside a code instrument. It never means "available" or "online". Those states are blue.

**The Blue Hairline Rule.** Borders and dividers are structural-blue alphas, never neutral grey.

## Typography

**Display Font:** Hubot Sans (next/font/google, width axis via `--wdth`), falling back to Geist
**Body Font:** Geist (with `ss01`, `cv11`), falling back to system sans
**Label/Mono Font:** Geist Mono, falling back to ui-monospace

**Character:** GitHub's engineering face opened up on its width axis gives the walls an engineered, wide-stance voice. Geist reads quietly beneath it, and Geist Mono reads the instruments.

### Hierarchy
- **Display** (760, `clamp(2.9rem, 6.3vw, 5.6rem)`, 0.94, wdth 125): The hero name only, in two mask-revealed lines.
- **Headline** (700, `clamp(2.25rem, 5vw, 4.4rem)`, 0.94, wdth 104): Section statements, max 19ch. Case titles go wider and larger (wdth 118 to 125, up to `clamp(2.4rem, 7.4vw, 5.25rem)`), and route titles use wdth 112.
- **Title** (700, about 1.5 to 2.4rem clamps, wdth 100 to 112): Principle titles, landing-page niche titles, secondary case titles.
- **Lead** (400, 17 to 18px, 1.6): Hero proposal (17px), route leads and case taglines (18px, 19.2px from sm).
- **Body** (400, 16px, 28px leading): Section leads, problem/solution, journey summaries, max about 40rem. **Body small** (15px, 28px) for contribution lists and notes; 14px for stack readings, buttons and meta.
- **Label** (Geist 500, 11px, 0.1em, uppercase, faint): Content labels such as "Problema", "Solução", "Autoria".
- **HUD** (Geist Mono, 11px, 0.12em, uppercase, faint): Names a system part, path, place or value, such as console heads and readout keys.
- **Readout** (Geist Mono, 13px): Values in readouts, dossier facts, years.
- **Code** (Geist Mono, 11 to 12px, 1.6 to 1.7): Code blocks. Window titles use 11.5px and status bars 10px.

The text scale in use is 10, 11, 11.5 (mono titles and numbering), 12, 13, 14, 15, 16, 17 and 18px, plus the display clamps. Graph SVG text uses 9.5, 10 and 12.5px.

### Named Rules
**The Wide Wall Rule.** Hubot Sans is only for titles (the `.display` role: 700 weight, -0.03em tracking, 0.08em word-spacing to return the gaps that negative tracking closes). Tune width per use with `--wdth`. Never set reading text in it.

**The Mono Means Machine Rule.** Mono is for things a machine reads or prints: code, paths, readouts, HUD, indices, coordinates. A label about content uses the sans label.

**The Index Beside Rule.** A section's index (`0N — LABEL`, number in blue) sits beside the statement on desktop and below it on phones. It never sits above the statement as an eyebrow.

## Layout

The page uses a 1320px container with a fluid gutter (`clamp(1.25rem, 4vw, 3rem)`) and fluid section padding (`clamp(6rem, 12vw, 10rem)`). The front wall is a full-viewport 12-column grid: copy on the left (6 or 7 columns), the operator portrait console on the right (6 or 5), the four specialty stations on a track at the base, and real indicators (local time, "desde", commit) top-right. On phones, the portrait becomes a dossier strip (portrait plus mono facts) right after the copy, so the face stays in the fold.

From lg (1024px), the mission line runs in the left gutter, 1.5rem outside the content, and every section header's station node sits on it. Below lg, each header draws its own short arrival line. From 1400px, a fixed index rail with one node per station sits at the far left. The progress hairline under the 64px header shows at every width. Section headers use a 1.3fr / 0.7fr split (statement / index plus lead). Readouts reflow 1, 2 and 4 columns at sm and xl. The construction grid is 24px minor and 120px major, and rulers tick on the same steps.

## Elevation & Depth

The system is flat by default, with structural depth. Consoles, readouts and lists sit on the field, separated by hairlines and tonal surface steps. Depth on the front wall comes from three parallax layers (drafting grid, datums and ruler, crosshair) and a soft radial blue light behind the operator. Only floating instruments cast a shadow. Glow is light, not shadow: blue dots and nodes carry a small blue halo because they are lit.

### Shadow Vocabulary
- **Window float** (`0 1px 0 rgb(255 255 255 / 0.04) inset, 0 24px 48px -16px rgb(0 0 0 / 0.65), 0 56px 110px -30px rgb(3 8 20 / 0.8)`): Code windows and browser frames.
- **Operator float** (`0 30px 70px -24px rgb(0 0 0 / 0.85), 0 0 0 1px rgb(94 158 255 / 0.04) inset`): The portrait console on the front wall.
- **Device float**: The iPhone band's titanium highlights and a deep drop, in container units.
- **Primary lit** (`inset 0 1px 0 rgb(255 255 255 / 0.4), 0 0 0 1px rgb(141 186 255 / 0.5), 0 12px 32px -12px rgb(94 158 255 / 0.75)`): The primary button, which is lit from inside.
- **Node glow** (`0 0 8px` to `0 0 12px` of luminous blue at 0.75 to 0.9): Live dots, active rail nodes, station nodes.

### Named Rules
**The Floating Instrument Rule.** Only windows, device frames and the operator portrait cast a drop. Consoles stay flat on the field.

## Shapes

Corners are tight and instrument-like: 6px for consoles and buttons, 8px for windows, 5px for chips, 4px for URL bars and tooltips. Nodes and dots are circles. Console corners carry 11px registration ticks in luminous blue (1px strokes at 85% opacity), drawn over the hairline frame. Construction lines overshoot their crossings and are marked with 14px registration crosses. Edges in graphs follow one vocabulary: solid for sync, dashed (6 5) for async, queue or cron, and dotted (1.5 4.5, round caps) for external integration.

## Components

### Buttons
- **Shape:** Tight corners (6px), 48px tall, 24px inline padding, 14px Geist medium. Press scales to 0.98.
- **Primary:** Luminous blue fill with dark on-blue ink, lit from inside. On hover it goes to bright blue and a white sheen crosses it (the sheen is hidden under reduced motion).
- **Secondary:** Strong hairline over translucent surface, ink text. On hover the border turns blue and the fill goes to elevated.
- **Ghost:** Muted text, 36px, which goes to ink on hover.
- **Text link:** Ink with a 1px underline that grows from the left and an arrow that turns blue.

### Chips
- **Role chip:** Strong hairline, surface at 70%, 5px corners, 14px ink.

### Consoles (signature)
- **Frame:** Hairline border, 6px, surface at 72%, blue corner ticks.
- **Head strip:** At least 2.5rem tall, a hairline under it, 14px inline padding, HUD label on the left and HUD status on the right.
- **Use:** Case parameters, author notes, the portrait, landing-page groups. Consoles are flat.
- **LiveDot:** A 6px luminous blue dot with a blue glow that reads "no ar" (on air). Live is always blue.
- **Readouts:** A definition grid between hairlines. The key is in HUD, the value is a 13px mono readout in ink. When the grid enters, each value lands one by one with a bloom (white with a blue text-glow that settles in 1.1s).

### Windows and devices
- **Window:** 8px, top sheen, the window float shadow, corner ticks. The head strip has a 7px blue square, an 11.5px mono file path and a meta value. The status bar is 28px with 10px mono text. Code lines highlight with a blue 8% band and a 2px blue left bar.
- **BrowserFrame:** Window shell with a quiet chrome: three neutral dots and a mono URL bar with a lock that shows the real address.
- **iPhone mockup:** Scales in container units, with a brushed-titanium band, side keys, a Dynamic Island, and status/Safari bars that take the capture's own colours.

### Navigation
- **Header:** 64px, fixed. It is transparent at the top, and once scrolled becomes field at 80% with a backdrop blur and a hairline. Links are muted and become ink when active, with a shared blue underline that moves between them (Motion `layoutId`). On mobile, a full menu lists the sections at 18px between hairlines.
- **Mission rail:** A 1px progress hairline under the header that fills left to right with the scroll, using a blue gradient. From 1400px a fixed index rail shows 7px nodes with mono indices. The active node is filled blue with a glow, and the label shows as a mono tooltip on hover or focus.

### Section header (title frame)
A ruler draws across from a station node: a 9px ring in blue with a glow, sitting on the mission line. The statement then cuts in line by line behind a mask. The index (`0N — LABEL`, number in blue, dash in strong hairline) and the lead sit beside it.

### Front wall
A drafting grid masked to an ellipse, datum lines with registration crosses, a numbered vertical ruler, and a pointer crosshair with a mono x/y readout. The four specialty stations sit on a track that draws left to right, and a launch curve rises from the last station behind the operator portrait console, which powers on from a centre band.

### System graph
An architecture console. Nodes are hairline boxes in structural blue, and the parts Pedro built get a 1.25px blue ring with "construído por mim" in blue. Hovering, focusing or tapping a node lights its direct edges and dims the rest. Edges use the sync/async/external vocabulary and carry a legend. Below the graph, a tiered list shows the same nodes.

### Stack station map
One layer per row: a toolbar of logo toggles (one Tab stop, arrow keys move inside it) and a readout of the item under the pointer or focus, otherwise the pinned item (name, use, `onde` in mono). The readout reserves the height of the tallest item, so switching never moves the page.

### Motion
One owner per effect. CSS keyframes own the front-wall boot (enter, enter-fade, enter-window, mask-line, boot-draw, rail-draw, power-on), staggered by `--d`. GSAP and ScrollTrigger load lazily after hydration. MotionRoot runs them from data attributes: `data-reveal` (or `="rule"`), `data-stagger`, `data-title`, `data-draw` (or `="scrub"`), `data-print`, `data-power`, `data-parallax`, `data-exit` (from 1024px only) and `data-loop`. Motion (motion/react) owns component state: the nav underline, the menu and copy feedback. Durations are 0.18, 0.32, 0.6, 0.9 and 1.2s. Easing is expo.out (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances and power3.inOut for travel. Anything already on screen when motion arms is left alone, loops run only in view, and reduced motion, print and no-JS show the finished markup.

### Imagery
The portrait is Pedro's own photo, graded only and never retouched. Project captures are real public pages, framed in a BrowserFrame or iPhone.

## Do's and Don'ts

### Do:
- **Do** keep luminous blue as the only light: primary fill with on-blue ink, live dots, active states, station nodes, the mission line, focus rings and bloom.
- **Do** draw every border in structural-blue hairlines, and separate surfaces with tonal steps rather than shadows.
- **Do** frame instruments as consoles: hairline, 6px, blue corner ticks, a HUD head strip.
- **Do** open every section with the title frame: station node on the mission line, ruler, statement in wide Hubot Sans, index and lead beside it.
- **Do** print real values from the code as readouts, and let them land with a bloom.
- **Do** draw graphs with solid, dashed and dotted edges, ring Pedro's parts in blue, isolate on hover and focus, and show the legend.
- **Do** give every scroll effect one owner (CSS boot, GSAP via MotionRoot data attributes, or Motion for state) and timings from `lib/motion.ts`.
- **Do** make the finished markup the default, so reduced motion, print and no-JS read the whole page.

### Don't:
- **Don't** use green for "live" or "available". Green is only a success result inside code instruments.
- **Don't** use amber or syntax colours outside code.
- **Don't** set reading text in Hubot Sans, or content labels in mono.
- **Don't** put the section index or any tracked uppercase line above a heading as an eyebrow.
- **Don't** give consoles, lists or readouts a drop shadow. Only windows, devices and the operator portrait float.
- **Don't** use neutral grey borders. Hairlines are structural blue.
- **Don't** retouch the portrait or stage captures. Grade only, and use real pages.
