---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/landing-pages/page.tsx","app/landing-pages/[nicho]/page.tsx"]
---

# Surface brief — portfolio home + landing-page niche routes

Scope: `/` (home) and `/landing-pages`, `/landing-pages/[nicho]`. Visitor mode: **Experience** (portfolio; the work leads from the first viewport), with Persuade duties on the hero CTAs.

Audience: recruiters, tech leads and founders evaluating Pedro Tortoriello as a Software Engineer (Full Stack Development & Automation). Job: understand within one viewport that he builds real systems; act: explore projects, open the CV, contact by e-mail/LinkedIn/GitHub. Proof: real repositories, real code excerpts, verified live URLs; co-authored work labelled. Constraints: nothing invented (no metrics, clients or claims beyond the CV and repos); pt-BR copy, English section titles as pinned by the brief; prefers-reduced-motion honoured.

## Direction contract

THESIS: The page is an engineer's workspace in session — every section is a working instrument (terminal, editor, architecture graph, request lifecycle, git-graph timeline, CI pipeline, build console) rendering Pedro's real work. It refuses the category default: avatar + "Hi, I'm" + skill bars + three identical project cards.

OWN-WORLD: Deep #07090D field, layered #0D1118/#121925 surfaces, 1px rgba(148,163,184,.16) hairlines, a 56px technical grid and radial blue light pools. Electric blue #4388FF is the only action/emphasis colour; cyan #46D9FF appears only on live data flow; terminal green #65E6A5 only on success. Geist display with tight tracking; Geist Mono only for code, terminal, paths and data. One line vocabulary on every diagram: solid = synchronous, dashed = async/queue/cron, dotted = external integration; blue-ringed nodes = built by Pedro.

STORY: The visitor sees a software engineer at work (headline + typed terminal + real code), then four engineering cases each with its own instrument, then a two-lane career log, a stack laid out as system layers, a reasoning pipeline with evidence per stage, landing pages grouped by niche, and direct contact.

FIRST VIEWPORT: Asymmetric 12-col. Left 7 cols: availability pill, 4rem headline in three lines ("Engenharia de software." / "Sistemas que resolvem problemas reais." with a blinking blue caret), one-sentence description, primary "Explorar projetos" + secondary "Ver currículo", role line. Right 5 cols: terminal window in front typing whoami/focus.json; real CadenceFlow editor window behind and lower, bleeding toward the edge with pointer parallax at a different depth. Behind everything a canvas service graph (client→edge→api→worker→data) with cyan pulses and cursor-reactive nodes. Bottom: four-item specialties rail inside the fold at 1440×900.

FORM: Brief-pinned "Technical Elegance" world (the brief pins palette, fonts and instruments, so it beats the roll; not on the rolled list). Raises taken from declined challengers: isolate-a-path on node hover/focus (collider event display); a fixed line-state legend reused by every graph (exposure record); headline type mass with nothing competing in the left column (manifesto page). Seed key 7384293e.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: hover or Tab onto any architecture node → its direct connections light up in blue, everything else dims, and the caption explains that node (and whether Pedro built it).
Motion grammar: one hero boot sequence (mask-up headline, window rise, typed terminal, graph draw-in), then quiet scroll reveals; diagram edges draw in; pulses run only on screen; all motion has a reduced-motion path.
