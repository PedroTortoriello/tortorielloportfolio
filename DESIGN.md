# Design

## Theme

Dark, matte, near-monochrome. A flat graphite canvas (no ambient effects: no aurora, no glow, no grain, no animated background) carrying a single restrained **amber/gold** accent used only on interactive elements (primary CTA, active/hovered links). The register is **mature B2B consultancy / established product**, not "dark dev tool" and not "AI startup." Authority comes from typography, a visible structural grid, generous whitespace, and proof, not from effects.

Physical scene: a serious technology partner's capabilities document, read by a business decision-maker who needs to trust fast. Dark is kept because the client identity is dark; it is made credible by restraint, not neon.

Explicitly avoided (client direction): gradients, blur backgrounds, aurora, particles, glow on elements, glassmorphism, floating/lifting cards, marquees, scroll-spectacle animations, Vercel/Linear section clichés, the "Claude-default" look.

## Color (OKLCH) — near-monochrome + one sober accent

Strategy: **Restrained / near-monochrome.** A neutral graphite ramp (chroma ~0.004, essentially gray) carries the whole page; one muted amber accent appears only on actions and active states (≤ ~5% of surface). No second chromatic color anywhere.

| Token | OKLCH | Role |
|---|---|---|
| `--bg` | `oklch(0.17 0.004 250)` | Page canvas (matte graphite) |
| `--bg-2` | `oklch(0.205 0.004 250)` | Raised band |
| `--surface` | `oklch(0.205 0.004 250)` | Panel fill (flat) |
| `--surface-2` | `oklch(0.25 0.004 250)` | Input / hover |
| `--border` | `oklch(1 0 0 / 0.10)` | Structural hairline (carries the grid) |
| `--border-strong` | `oklch(1 0 0 / 0.18)` | Emphasis rule |
| `--ink` | `oklch(0.98 0.002 250)` | Primary text |
| `--ink-muted` | `oklch(0.74 0.004 250)` | Body (8.3:1 on bg) |
| `--ink-faint` | `oklch(0.61 0.004 250)` | Labels/captions (AA on bg+surface) |
| `--accent` | `oklch(0.80 0.09 73)` | Muted gold: CTA fill, active link |
| `--accent-strong` | `oklch(0.74 0.095 70)` | Hover/pressed |
| `--accent-ink` | `oklch(0.22 0.04 70)` | Text on accent fills |

All pairs verified ≥4.5:1 (body) / ≥3:1 (large). Accent reserved for interaction; it is never ambient decoration.

## Typography

Geist (sans) for display + body, Geist Mono for small structural labels (kickers, metric figures, indices). One family in weight/size contrast + mono. Strong scale: hero `clamp(2.5rem, 5.5vw, 4.5rem)`, tight tracking on display (-0.03em), generous line-height on body. `text-wrap: balance` on headings. Mono labels are neutral (`ink-faint`), never colored — color is reserved for actions.

## Motion (deliberately minimal)

Library: `motion`. Only: a subtle fade-up (opacity + ~10px y, ~0.5s) on a section's heading/content block the first time it enters view, and hover microinteractions (link color/underline, button background, card border-color). No per-item stagger spectacle, no scroll-linked timelines, no magnetic buttons, no entrance-from-all-sides, no marquee. Every motion has a reduced-motion path (instant). The logo strip is static.

## Layout

- Container max-width 1180px; generous fluid section rhythm `clamp(6rem, 11vw, 9rem)`.
- The grid is **visible and structural**: hairline rules separate columns and rows (services, results, process, stack), echoing a capabilities document. Panels are flat, bordered, small-radius (0.75rem), no shadow, no lift.
- Cards used only where genuinely the right affordance; prefer rules + whitespace over boxes.

## Components

Solid (non-glass) header, flat bordered Panel, clean amber/secondary Button (no magnetic, no glow), static automation diagram, numbered method (static), accordion FAQ, hairline-divided bands. Icons: `lucide-react` (thin, monochrome). Tech logos: `cdn.simpleicons.org` + local `/logos`.
