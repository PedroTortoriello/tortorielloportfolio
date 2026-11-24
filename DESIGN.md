---
name: Pedro Tortoriello
description: A security-printed document series for the systems Pedro put into production.
colors:
  bg: "#e4ebe5"
  surface: "#eef3ef"
  elevated: "#dfe7e1"
  raised: "#d4ded6"
  structure: "#1f6b5e"
  line: "rgb(20 26 34 / 0.16)"
  line-strong: "rgb(20 26 34 / 0.32)"
  line-faint: "rgb(20 26 34 / 0.09)"
  ink: "#141a22"
  ink-muted: "#3c4750"
  ink-faint: "#5b6670"
  accent: "#7a1424"
  accent-deep: "#5c0e1a"
  on-accent: "#f6f8f6"
  green: "#1f6b5e"
  amber: "#8a5a12"
  sx-kw: "#7a1424"
  sx-fn: "#1f6b5e"
  sx-str: "#8a5a12"
  sx-num: "#9b3d1f"
  sx-type: "#1f4f7a"
  sx-com: "#66717b"
  sx-punct: "#4b5560"
  sx-id: "#141a22"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.6vw, 6rem)"
    fontWeight: 720
    lineHeight: 0.97
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.4rem)"
    fontWeight: 720
    lineHeight: 0.97
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 104"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 720
    lineHeight: 0.97
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 112"
  ui:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 104"
  lead:
    fontFamily: "Source Serif 4, Georgia, ui-serif, serif"
    fontSize: "clamp(1.0625rem, 1.35vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Source Serif 4, Georgia, ui-serif, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: "Source Serif 4, Georgia, ui-serif, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 640
    lineHeight: 1.2
    letterSpacing: "0.12em"
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
  plate: "2px"
  window: "1px"
  dot: "9999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(6rem, 12vw, 10rem)"
  container: "1320px"
  header: "64px"
  plate-head: "2.5rem"
  plate-pad: "0.875rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.ui}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
  button-secondary:
    textColor: "{colors.accent}"
    typography: "{typography.ui}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  button-ghost:
    textColor: "{colors.ink-muted}"
    padding: "0 4px"
    height: "36px"
  plate:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.plate}"
  plate-head:
    textColor: "{colors.ink-faint}"
    typography: "{typography.hud}"
    padding: "0 14px"
    height: "{spacing.plate-head}"
  window:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.plate}"
  chip-role:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "4px 10px"
  readout:
    textColor: "{colors.ink}"
    typography: "{typography.readout}"
    padding: "16px"
  nav-header:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-muted}"
    height: "{spacing.header}"
---

# Design System: Pedro Tortoriello

## Overview

**Creative North Star: "Papel de segurança"**

The site is a security-printed document series. Pedro's identity document opens it (name, role, a portrait in a guilloché frame, printed fields and a two-line MRZ), and every case after it is a numbered, authenticated document. The page is security paper: a pale green-grey tint carrying a fine anti-copy ground of two interlaced waves, as on a certidão. Documents sit on it as flat paper plates with a printed ink hairline and bordô registration marks at their corners. Cédula green engraves the structure (guilloché rosettes, wave rules, graph edges). One intaglio bordô is the only ink that acts: primary actions, active state, serials, and the security thread.

The whole page is one series bound by a windowed security thread. From lg up it runs in the left gutter as a dashed bordô thread whose solid core is printed by the scroll, and each section header sets a bordô window on it beside the section's serial. From 1400px a fixed thread with one window per section indexes the page. Guilloché is generated from curves, never pasted: each rosette is a modulated ring repeated with a small rotation, seeded per document, so no two seals match. Rosettes draw themselves as their document enters, and hovering a document turns its latent image by half a lobe, like tilting a banknote. MRZ lines and microtext are real text.

Archivo, opened on its width axis, sets titles, numerals, labels and controls, the sans of an official form. Source Serif 4 reads. Geist Mono prints what a machine prints: serials, readouts, paths, code and the MRZ. Corners are square (2px). Depth is paper, not light: only floating plates (code listings, browser frames, captures, devices) lift off the sheet. Motion is printing: plates open from a centre band and the ink takes, values land in bordô and settle to ink, lines draw. Reduced motion, print and no-JS show the finished document.

**Key Characteristics:**
- Security paper (`bg`) with an anti-copy wave ground; flat document plates (`surface`) with ink hairlines and bordô corner registration marks.
- One ink that acts: intaglio bordô for primary action, active state, serials, thread and focus. Cédula green engraves structure.
- Archivo wide for titles and controls, Source Serif 4 for reading, Geist Mono for serials, readouts, MRZ and code.
- Guilloché rosettes, wave bands and wave rules drawn from curves, seeded per document; a windowed security thread binds the series.
- Square 2px corners everywhere except the iPhone mockup; only floating plates cast a drop.

## Colors

A printed-paper palette: green-grey security paper, near-black ink, cédula green engraving, and one intaglio bordô.

### Primary
- **Intaglio Bordô** (`accent`): The one ink that acts. Primary button fill, secondary button outline and text, active nav link and its 2px underline, the thread and its windows, section serials and case numbers, live dots, the scroll progress hairline, the focus ring, the caret, the selection tint (16%) and the scrollbar thumb. In graphs it marks the parts Pedro built.
- **Deep Bordô** (`accent-deep`): Primary hover, the far end of the progress hairline, async packets, and the closing words of the contact statement.
- **Paper White** (`on-accent`): Text on any bordô fill.

### Secondary
- **Cédula Green** (`structure`): Engraving. The outer weave and rings of every rosette, the green half of wave bands and wave rules, the guilloché ground on plates that carry it, microtext, and graph construction lines. On the advocacia route it also inks the "valid" document mark.

### Neutral
- **Security Paper** (`bg`): Page background, `theme-color`, the knockout ring behind markers on rules, and the paper ground of the anti-copy waves.
- **Plate** (`surface`): Document plates (at 88% on `.console`), floating windows, chips, guilloché frame fill.
- **Elevated** (`elevated`) / **Raised** (`raised`): Head strips and status bars of windows and browser frames, hovered rows and channels, the empty photo well.
- **Ink Hairline** (`line`), **Strong Hairline** (`line-strong`), **Faint Hairline** (`line-faint`): Every border and divider, as alphas of ink. Strong for plate edges, chips, inactive thread windows and the menu toggle; faint for list rules.
- **Ink** (`ink`), **Muted Ink** (`ink-muted`), **Faint Ink** (`ink-faint`): Titles and values; reading text; labels, HUD and captions.

### Code-only
- **Green** (`green`): A result that passed inside a code instrument (the request step that returns 200, the Pix CRC). It shares its value with `structure`.
- **Syntax set** (`amber`, `sx-*`): Only in printed listings and the Pix anatomy. Keywords print in bordô, functions in green, strings in amber.

### Named Rules
**The One Ink Rule.** Bordô is the only ink that acts. If something is not an action, the active state, a serial, the thread or focus, it is ink or green engraving. (On the advocacia route the headline and closing title are also bordô; on the portfolio titles stay ink.)

**The Printed Hairline Rule.** Borders and dividers are alphas of the ink colour, never neutral grey.

**The Engraving Is Green Rule.** Guilloché, wave rules and diagram structure are cédula green, with bordô as the interlaced second line. Green never fills a control.

## Typography

**Display Font:** Archivo (next/font/google, width axis via `--wdth`), falling back to system sans
**Body Font:** Source Serif 4 (optical sizing on), falling back to Georgia
**Label/Mono Font:** Archivo for field labels and controls; Geist Mono for serials, readouts, MRZ and code

**Character:** A wide grotesque that reads like the printed headings of an official form, over a bookish serif that carries the reading the way a document's body text does. Mono is reserved for what a machine prints.

### Hierarchy
- **Display** (720, `clamp(3rem, 6.6vw, 6rem)`, 0.97, wdth 125): The hero name only, two mask-revealed lines. The contact statement is the second largest (`clamp(2.75rem, 6.2vw, 6rem)`, wdth 112).
- **Headline** (720, `clamp(2.25rem, 5vw, 4.4rem)`, 0.97, wdth 104): Section statements, max 19ch. Case titles run wider: wdth 125 at `clamp(2.4rem, 7.4vw, 5.25rem)` for the first case, wdth 118 at `clamp(2.4rem, 6.2vw, 4.75rem)` for the rest.
- **Title** (720, about 1.9 to 3rem clamps, wdth 106 to 112): Sub-section titles ("Também construí"), niche and document titles. The advocacia route's smaller title role is 680 at wdth 106.
- **UI** (Archivo 620, 15px, wdth 104): Buttons, the hero role line (fluid 1.05 to 1.25rem), specialty names, the header name (660, wdth 106) and nav links (560, 14px).
- **Lead** (Source Serif 400, 17 to 19px, 1.6): Hero proposal; case taglines at 18 to 19.2px.
- **Body** (Source Serif 400, 16px, 28px leading): Section leads, problem/solution, journey summaries, max about 40rem. **Body small** (15px, 28px): contribution lists, field values, notes.
- **Label** (Archivo 640, 11px, 0.12em, uppercase, faint): Field labels on documents and content labels ("Nome", "Função", "Problema", "Autoria", footer groups).
- **HUD** (Geist Mono, 11px, 0.12em, uppercase, faint): Names a part, path, place or value: plate heads, readout keys, case slates.
- **Readout** (Geist Mono, 13px): Values in readouts and steps in request flows.
- **Code** (Geist Mono, 11 to 12px, 1.6 to 1.7): Listings. Window titles 11.5px, status bars 10px.
- **MRZ** (Geist Mono, fluid, 0.06 to 0.18em tracking): Machine-readable lines, 44 characters, A-Z, 0-9 and `<` only.

### Named Rules
**The Form Sans Rule.** Archivo sets titles, labels and controls; it never sets reading text. Tune width per use with `--wdth` (62 to 125).

**The Mono Means Machine Rule.** Mono is for things a machine reads or prints: serials, code, paths, readouts, MRZ, microtext. A label about content uses the Archivo label.

**The Index Beside Rule.** A section's serial (`0N — LABEL`, number in bordô) sits beside the statement on desktop and below it on phones, never above it as an eyebrow.

## Layout

A 1320px container with a fluid gutter (`clamp(1.25rem, 4vw, 3rem)`) and fluid section padding (`clamp(6rem, 12vw, 10rem)`). The hero is a full-viewport 12-column grid: name, role, proposal and actions in 7 columns, the identity document in 5 (max 30rem), and the four specialties under a wave rule at the base (2 columns on phones, 4 from lg). On phones the document follows the copy, portrait and fields side by side.

From lg (1024px) the security thread runs in the left gutter, 1.5rem outside the content, and each section header's window sits on it; below lg each header draws its own short bordô arrival line. From 1400px a fixed thread with one window per `[data-station]` section sits at the far left. A 1px progress hairline under the 64px header shows at every width. Section headers split 1.3fr / 0.7fr (statement / serial and lead). Cases recompose on 12 columns, each in its own layout, separated by a cut: generous space and a wave rule drawing across. Readouts reflow 1, 2 and 4 columns at sm and xl.

## Elevation & Depth

The sheet is flat. Plates, readouts, lists and slates lie on the paper, separated by ink hairlines and small tonal steps (`surface`, `elevated`, `raised`). Floating plates (code listings, browser frames, captures, the iPhone) lift with a soft ink-tinted drop and a white inset top edge, as printed paper laid over the sheet. The primary button carries a short bordô drop under its fill, as the one pressed ink. Markers on rules use a 4px `bg` ring (`0 0 0 4px var(--color-bg)`) as a knockout, not as elevation. Nothing glows.

### Shadow Vocabulary
- **Floating plate** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.7) inset, 0 22px 44px -24px rgb(20 26 34 / 0.38), 0 48px 90px -40px rgb(20 26 34 / 0.3)`): Code listings and browser frames.
- **Capture plate** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.6) inset, 0 28px 56px -30px rgb(20 26 34 / 0.45)`): Advocacia document captures; lifts 3px on hover.
- **Pressed ink** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12), 0 10px 24px -14px rgb(92 14 26 / 0.9)`): The primary button.
- **Device**: The iPhone's titanium band, in container units (see sidecar).

### Named Rules
**The Paper Lies Flat Rule.** Only floating plates (listings, browser frames, captures, devices) and the primary button cast a drop. Document plates, readouts and lists stay flat on the sheet.

## Shapes

Square, printed corners: 2px on plates, windows, buttons, chips, URL bars and tooltips; 1px on the small square marks (thread windows, window head marks). The iPhone mockup is the only rounded object. Dots (live, packets, browser chrome) are circles; career and method markers use circles, 11px squares and 45° diamonds on rules. Plate corners carry 12px bordô registration marks (1px strokes at 90%), drawn over the hairline edge. Rosettes are concentric: two outer rings, a woven green outer band, a bordô inner weave and a bordô centre flower. Wave bands are 22px strips of interlaced green and bordô waves; the wave rule is the same at 9px. Graph edges use one vocabulary: solid for sync, dashed (6 5) for async, queue or cron, dotted (1.5 4.5, round caps) for external integration.

## Components

### Buttons
- **Shape:** Square (2px), 48px tall, 24px inline padding, Archivo 620 at 15px, wdth 104. Press scales to 0.98. Arrows nudge on hover.
- **Primary:** Bordô fill, paper-white text, the pressed-ink drop; hover deepens to `accent-deep`.
- **Secondary:** 1px bordô outline with bordô text; on hover it fills bordô with paper-white text.
- **Ghost:** Muted ink, 36px, ink on hover.
- **Text link:** Ink with a 1px underline that grows from the left; the arrow turns bordô.

### Chips
- **Role chip:** Strong hairline, plate at 70%, 2px, 14px ink.
- **Stack chip:** Hairline, plate at 60%, 2px, 11.5px mono in muted ink.

### Document plate (signature)
- **Frame:** Strong ink hairline, 2px, plate at 88%, bordô registration marks.
- **Head strip:** At least 2.5rem tall, hairline under it, 14px inline padding, HUD label left, HUD status right.
- **Use:** Case slates, architecture and request-flow plates, author notes, the contact channels. Flat.
- **Live dot:** A 6px bordô dot before "no ar". Live is bordô, never green.
- **Readouts:** A definition grid between hairlines; HUD key, 13px mono value in ink. Values land one by one with an ink press (bordô, slightly spread, settling to ink in 1.1s).

### Identity document
A plate with a wave band across its top, a head strip ("Registro profissional" label, location in bordô HUD), a portrait inside a guilloché frame (9px of interlaced waves) with a rosette seal pressed over its corner, field rows (Archivo label over a serif value; dates and time in mono) and a two-line MRZ under a hairline. Only real values: CV facts, local time, build commit.

### Guilloché set
- **Rosette:** Generated per seed (FNV-1a hash mixed with a city's coordinates) from modulated rings; draws on load (hero) or with the scroll as it enters (`animation-timeline: view()`). Hovering or focusing its document turns the outer weave half a lobe. Used as the brand mark (32 to 36px), ID seal, contact seal and the advocacia denomination backdrop.
- **Wave band / wave rule:** 22px and 9px strips of interlaced green and bordô waves; top and base of documents, the footer's top, section and case rules.
- **Denomination:** A monumental Archivo numeral (820, wdth 118) filled with engraved bordô wave lines, pressed in from the bottom.
- **Microtext:** 5.5px mono, uppercase, green, repeated as a rule.
- **Mark:** A status overprint: Archivo 650 caps, 11px, 1px border plus an outline 2px outside it, in green (valid) or muted ink (pending).

### Windows and devices
- **Window:** Plate on the floating-plate drop, registration marks, head strip in `elevated` with a 7px bordô-outlined square, 11.5px mono path and meta; 28px status bar in 10px mono. Highlighted lines carry an 8% bordô band and a 2px bordô left bar.
- **Browser frame:** Window shell with three hairline dots and a mono URL bar (2px, lock icon) showing the real address.
- **iPhone mockup:** Container-unit scaling, brushed-titanium band, side keys, Dynamic Island, status and Safari bars in the capture's own colours.

### Navigation
- **Header:** 64px, fixed; transparent at the top, then paper at 80% with a backdrop blur and a hairline once scrolled. A rosette mark and the name in Archivo 660; a mono crumb from xl. Links are Archivo 560 at 14px, muted, ink on hover; the active link is bordô with a 2px bordô underline that travels between links. A secondary-style "Currículo" button at 36px. On phones a full menu lists sections at 18px between hairlines, with mono indices.
- **Security thread:** The progress hairline under the header fills left to right in a bordô gradient. From 1400px a fixed dashed thread with a printed core and 7 by 11px windows (bordô when active, hairline otherwise) and mono indices; the label shows as a mono tooltip plate on hover or focus.

### Section header
A wave rule reveals from the section's bordô window on the thread, then the statement cuts in line by line. The serial (`0N — LABEL`, number in bordô, dash in strong hairline) and the lead sit beside it.

### System graph
An architecture plate. Nodes are hairline boxes on green construction; Pedro's parts get a bordô ring and "construído por mim". Hover, focus or tap isolates a node's direct edges. Edges follow the sync/async/external vocabulary with a legend; a tiered list below repeats the nodes.

### Motion
CSS keyframes own the hero boot (enter, enter-fade, enter-window, mask-line, rail-draw, power-on as a plate printing from a centre band), staggered by `--d`. GSAP and ScrollTrigger load lazily and run from data attributes via MotionRoot (`data-reveal`, `data-stagger`, `data-title`, `data-draw`, `data-print`, `data-power`, `data-exit`, `data-loop`). Rosette drawing and the latent image are CSS only. Motion (motion/react) owns component state: nav underline, menu, copy feedback. Easing is `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and `cubic-bezier(0.65, 0, 0.35, 1)` for travel. Reduced motion, print and no-JS show the finished document.

### Imagery
The portrait is Pedro's own photo, graded only. Project captures are real public pages in a browser frame or iPhone.

## Do's and Don'ts

### Do:
- **Do** keep bordô as the one ink that acts: primary fill with paper-white text, secondary outline, active nav, serials, the thread and its windows, live dots, focus and the ink press.
- **Do** draw every border as an ink-alpha hairline and separate plates with small tonal steps.
- **Do** frame documents as flat plates: strong hairline, 2px corners, bordô registration marks, a HUD head strip.
- **Do** generate guilloché from curves with a per-document seed; never reuse one seal image.
- **Do** open every section with its window on the thread, the wave rule, the statement in wide Archivo and the serial beside it.
- **Do** print real values (fields, MRZ, readouts, URLs, local time, commit) and let them land with the ink press.
- **Do** make the finished markup the default, so reduced motion, print and no-JS read the whole document.

### Don't:
- **Don't** round corners beyond 2px; the iPhone mockup is the only rounded object.
- **Don't** give plates, readouts, lists or slates a drop shadow. Only floating plates and the primary button lift.
- **Don't** use green for "live" or "available", or to fill a control. Live is bordô; green engraves and confirms a passed result.
- **Don't** use amber or syntax colours outside code.
- **Don't** set reading text in Archivo, or content labels in mono.
- **Don't** put the serial or any tracked uppercase line above a heading as an eyebrow.
- **Don't** use neutral grey borders or glows. Hairlines are ink; depth is paper.
- **Don't** retouch the portrait or stage captures.
