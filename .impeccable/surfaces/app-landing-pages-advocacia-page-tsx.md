---
version: 1
slug: "app-landing-pages-advocacia-page-tsx"
primary_target: "app/landing-pages/advocacia/page.tsx"
related_targets: []
---

# Surface brief — /landing-pages/advocacia (own world)

Scope: the advocacia niche route only, `app/landing-pages/advocacia/page.tsx`, which overrides the shared `[nicho]` template for this slug and hides the portfolio's recruiter chrome (header, mission rail, footer) for a focused header of its own. Since Nov 23, 2026 the whole site shares this world (see app-page-tsx.md); this route is its most direct form. Visitor mode: **Persuade**, with the work leading.

Audience: lawyers and small law firms in Brazil who asked for a portfolio, usually opening the link from WhatsApp on a phone or at the office desk. Job: believe that Pedro builds law-firm sites with their own identity, inside OAB Provimento 205/2021, then act: WhatsApp (primary), e-mail (secondary). Proof: the 12 published or in-approval sites in `lib/landing-pages.ts`, their real captures and live URLs. Copy speaks the lawyer's language (what the office receives), never stack or schema names. Constraints: nothing invented beyond the CV and repos; approval previews labelled; pt-BR; reduced motion honoured; content visible without JS.

## Direction contract

THESIS: The advocacia portfolio is a security-printed document series: each office is a numbered, authenticated document with its own guilloché. It refuses the category default (navy, gold, Themis, serif grid of mockups) and the portfolio's dark developer control room.

OWN-WORLD: Security-paper tint #E4EBE5 with a fine anti-copy line ground; intaglio bordô #7A1424 for titles, numerals and the primary action; cédula green #1F6B5E for guilloché and secondary ink; ink #141A22. Guilloché rosettes and borders generated from parametric curves, microtext lines, serials "Nº 03/12", a windowed security thread, status overprinted as a document mark. Archivo wide for titles and numerals, Source Serif 4 for reading, Geist Mono for serials, MRZ and microtext. Square corners, hairline rules, the captures are the only plates.

STORY: The lawyer understands in seconds what Pedro builds and for whom, scans the register of 12 offices, opens a few documents (desktop and phone captures, what the office received), and taps "Conversar pelo WhatsApp"; the series closes on Nº 13, reserved for the next office.

FIRST VIEWPORT: 1440x900. One document plate edge to edge. Top strip: "Pedro Tortoriello · Sites para advocacia" left, WhatsApp action right. Left 7 cols: field label, headline "Sites para escritórios de advocacia" in Archivo wide at about 5rem bordô, one serif sentence, primary "Conversar pelo WhatsApp" (bordô fill) and "Ver os 12 escritórios". Right 5 cols: the denomination numeral 12, monumental, filled with guilloché lines over a rosette, with its caption. Base: an MRZ microline. From lg, the security thread runs in the left gutter.

FORM: Papel de segurança (security document), position 5 of 7 on the ordered list, seed key 50b1054e.

Signature interaction: each document's rosette draws line by line as it enters; hovering or focusing a document shifts its latent image (rosette phase), like tilting a banknote; the thread's window shows the current serial.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
