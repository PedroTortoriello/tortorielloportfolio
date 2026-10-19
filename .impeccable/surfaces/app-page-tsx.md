---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/landing-pages/page.tsx","app/landing-pages/[nicho]/page.tsx","app/landing-pages/[nicho]/[lp]/page.tsx"]
---

# Surface brief — portfolio home + landing-page niche routes (V2)

Scope: `/` (home) and `/landing-pages`, `/landing-pages/[nicho]`, `/landing-pages/[nicho]/[lp]`. Visitor mode: **Experience** (portfolio; the work leads from the first viewport), with Persuade duties on the hero CTAs.

Audience: recruiters, tech leads and founders evaluating Pedro Tortoriello as a Software Engineer (Full Stack Development & Automation). Job: understand within one viewport that he builds real systems; act: explore the cases, open the CV, contact by e-mail/LinkedIn/GitHub. Proof: real repositories, real code excerpts, real captures of the live products, verified live URLs; co-authored work labelled. Constraints: nothing invented (no metrics, clients, telemetry or claims beyond the CV and repos; indicators show only real values such as the build commit, the local time in Salto or parameters written in the code); pt-BR copy; prefers-reduced-motion honoured; content visible before and without animation.

Brief pins (Portfolio V2, Oct 2026): palette #080B10 field, #111925 surfaces, #244561 structural blue, #5E9EFF luminous blue, #E8EDF4 text; expressive display type, comfortable body, mono for technical elements; GSAP + ScrollTrigger for scroll-coordinated sequences, Motion for component micro-interactions, CSS/SVG for light effects, Three.js only with concrete gain.

## Direction contract

THESIS: The portfolio is a flight control room for the systems Pedro put into production. Each case is a console that reads real parameters from its code; the whole page runs as one mission whose trajectory line is drawn by the scroll. It refuses the category default (avatar, "Hi, I'm", skill bars, three identical project cards) and V1's workspace of floating windows.

OWN-WORLD: #080B10 field; #111925 console surfaces; #244561 structural blue for bezels, construction lines that overshoot their corners, rulers and graph structure; #5E9EFF luminous blue as the only light (live line heads, "no ar" and availability states, active state, bloom, primary action with dark ink); green survives only inside code instruments as a success result (200 OK, CRC válido); #E8EDF4 ink. Hubot Sans at wide widths for wall titles, Geist for reading, Geist Mono for readouts and logs. Consoles are hairline frames with blue corner registration ticks, a labelled header strip and mono readouts.

STORY: The visitor reads name, specialty and proposal on the front wall and meets the operator (Pedro's portrait) while the trajectory draws; then four case consoles (real capture, architecture, parameters, decisions), the mission log (career), the go/no-go process, the flight rules (principles), the station map (stack), landing pages, and the channel that closes the page (contact).

FIRST VIEWPORT: 1440x900, 12 cols. Left 7: "Pedro / Tortoriello" in two mask-revealed lines of wide Hubot Sans at about 6rem; "Software Engineer — Full Stack Development & Automation"; the one-sentence proposal; primary "Explorar projetos" (luminous blue, dark ink) + secondary "Ver currículo". Right 5: the operator console, Pedro's own photo (supplied by him, graded cool to the palette, never retouched) in a ticked console frame that powers on from a centre band. The demonstrative log console was removed from the hero at Pedro's request (Oct 19, 2026); log/bloom grammar lives on in the case readouts. Behind, three depth layers: drafting grid with rulers, HUD crosshair following the cursor. The trajectory runs through the four stations (the four specialties) on the track at the base of the fold, drawing left to right during the boot, and launches from the last station up behind the operator console. Real indicators sit top-right on desktop (local time in Salto, "desde 2021", build commit) and inside the operator dossier on phones; availability sits under the CTAs. Phones open with the operator dossier strip (portrait + facts) so the face is in the fold. Recorded Oct 19, 2026 after the portrait replaced the log console.

FORM: Mission control room, position 5 of 7 on the ordered list, seed key ca6d1bd5. Raises: Bebop title card (sections cut in as title frames, a fixed index rail keeps the running order); night-market sign river (one luminous trajectory line drawn through the page by the scroll, through every section's station node); phosphor terminal (readouts land with a bloom, states print themselves); HyperCard stack (every case deep-linkable); sewing pattern (the path Pedro built stays solid, the rest recedes).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: scrolling draws the mission trajectory through every station (fixed index rail + page progress), and hovering or tabbing onto an architecture node isolates the path Pedro built.
Motion grammar: CSS boot sequence on the front wall (never blocking: name, specialty, proposal and CTAs read within about 1s; the station track and the launch finish as ambient motion by about 3.8s; portrait power-on); GSAP ScrollTrigger owns every scroll-linked effect (title-frame cuts, line drawing, console power-on, parallax, progress); Motion owns component state (nav underline, menu, copy feedback); all loops pause off screen; reduced motion shows the finished state.
