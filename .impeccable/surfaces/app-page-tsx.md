---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/landing-pages/page.tsx","app/landing-pages/[nicho]/page.tsx","app/landing-pages/[nicho]/[lp]/page.tsx"]
---

# Surface brief — portfolio home + landing-page routes (V3, "Papel de segurança")

Scope: `/` (home) and `/landing-pages`, `/landing-pages/[nicho]`, `/landing-pages/[nicho]/[lp]`. `/landing-pages/advocacia` has its own brief in the same world. Visitor mode: **Experience** (the work leads from the first viewport), with Persuade duties on the hero and contact actions.

Audience: recruiters, tech leads and founders judging Pedro Tortoriello as a Software Engineer (Full Stack Development & Automation); businesses looking for a landing page in their niche. Job: see within one viewport that he builds real systems; explore the cases, open the CV, reach out. Proof: real repositories, code excerpts, live captures, verified URLs; co-authored work labelled. Constraints: nothing invented beyond the CV and repos; pt-BR; reduced motion honoured; content visible without JS.

Decision (Nov 23, 2026): Pedro asked for one language across the whole portfolio and chose "Papel de segurança", first built on /landing-pages/advocacia (seed 50b1054e). It replaces the V2 "Control Room" everywhere.

## Direction contract

THESIS: The portfolio is a security-printed document series: Pedro's identity document opens it, every case is a numbered, authenticated document, and a windowed security thread runs through the page. It refuses the developer-portfolio default (dark terminal, avatar, skill bars, three equal cards) and its own V2 control room.

OWN-WORLD: Security-paper tint #E4EBE5 with a fine anti-copy wave ground; intaglio bordô #7A1424 is the one ink for action, active state, serials and the thread; cédula green #1F6B5E draws guilloché, rules and graph structure; ink #141A22. Documents are flat paper plates with hairline ink borders and bordô registration marks; guilloché rosettes and wave borders are generated from curves; MRZ lines and microtext are real text. Archivo (wide) for titles and numerals, Source Serif 4 for reading, Archivo for controls and field labels, Geist Mono for serials, code, readouts and MRZ. Square corners (2px); only captures, devices and code listings float.

STORY: The visitor meets Pedro's identity document (name, role, portrait, fields, MRZ), reads the proposal, then the case documents (capture, architecture, parameters, decisions), the career record, the process, the principles, the stack register, the landing-page series by niche, and the contact that closes the series.

FIRST VIEWPORT: 1440x900, 12 cols. Left 7: "Pedro / Tortoriello" in Archivo wide about 6rem, ink; role line; one-sentence proposal; primary "Explorar projetos" (bordô fill) and "Ver currículo". Right 5: the identity document — portrait in a guilloché-framed plate, field rows (função, local, desde, atuação) and a two-line MRZ, with the local time and build commit as real values. Wave border at the top of the document; the four specialties sit on the base as numbered fields. Phones: the identity document follows the copy, portrait and fields side by side.

FORM: Papel de segurança (security document), position 5 of 7, seed key 50b1054e, extended from the advocacia route to the whole site at the user's request.

Translation of V2 grammar: night field → security paper; luminous blue → bordô; structural blue → cédula green; console ticks → registration marks; mission line and rail → windowed security thread with serial windows; station nodes → serials "Nº 01"; drafting grid and ruler → anti-copy ground and wave rule; crosshair → removed; operator console → identity document; bloom → ink press; dark code windows → printed listings on paper.

Signature interaction: the security thread is printed by the scroll and its windows show each section's serial; rosettes draw as their document enters; hovering a document turns its latent image.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
