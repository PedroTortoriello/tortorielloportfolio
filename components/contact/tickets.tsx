import type { CSSProperties } from "react";
import s from "./contact.module.css";
import { TicketsReveal } from "./tickets-reveal";

type Kind = "arrow" | "mark" | "globe";
// [x, y] in percent of the headline box, width in em of the headline size, tilt in degrees.
type Spot = [x: number, y: number, w: number, r: number];
type Ticket = {
  kind: Kind;
  at: Spot;
  phone?: Spot;
  depth: number;
  float: number;
  delay: number;
  wobble: number;
};

// Scattered as in the reference: a cluster where the lines start, one off the
// left edge, a few across the gaps between lines (so they bite letters without
// hiding a word), one in the space after the first line. Phones keep four at
// the corners, clear of the words' centres.
const tickets: Ticket[] = [
  {
    kind: "arrow",
    at: [2, 4, 0.9, 4],
    phone: [-3, -16, 1.5, -12],
    depth: 0.5,
    float: 7,
    delay: -1,
    wobble: 2,
  },
  {
    kind: "arrow",
    at: [-10, 38, 1.05, -14],
    depth: 1.15,
    float: 8.5,
    delay: -4,
    wobble: -2.5,
  },
  {
    kind: "globe",
    at: [12, 20, 1.2, 12],
    depth: 0.85,
    float: 6.5,
    delay: -2.5,
    wobble: 1.5,
  },
  {
    kind: "mark",
    at: [5, 40, 1, -11],
    depth: 0.6,
    float: 9,
    delay: -6,
    wobble: -2,
  },
  {
    kind: "arrow",
    at: [50, 22, 0.85, 8],
    depth: 0.95,
    float: 7.5,
    delay: -3,
    wobble: 2.5,
  },
  {
    kind: "globe",
    at: [70, 55, 1.1, -12],
    phone: [1, 90, 1.45, 11],
    depth: 0.45,
    float: 8,
    delay: -5,
    wobble: -1.5,
  },
  {
    kind: "mark",
    at: [89, 2, 1.05, 5],
    phone: [83, 2, 1.5, 9],
    depth: 1.2,
    float: 6,
    delay: -2,
    wobble: 2,
  },
  {
    kind: "mark",
    at: [36, 86, 1.1, -13],
    phone: [75, 94, 1.4, -9],
    depth: 0.7,
    float: 9.5,
    delay: -7,
    wobble: -2.5,
  },
];

const spot = ([x, y, w, r]: Spot, p = "") => ({
  [`--${p}x`]: `${x}%`,
  [`--${p}y`]: `${y}%`,
  [`--${p}w`]: `${w}em`,
  [`--${p}r`]: `${r}deg`,
});

const vars = (t: Ticket) =>
  ({
    ...spot(t.at),
    ...(t.phone ? spot(t.phone, "p") : {}),
    "--t": `${t.float}s`,
    "--delay": `${t.delay}s`,
    "--wobble": `${t.wobble}deg`,
  }) as CSSProperties;

// Lime admission tickets floating over the finale's headline. Each one drifts
// with the cursor (data-depth) and bobs on its own clock (CSS).
export function Tickets() {
  return (
    <TicketsReveal className="pointer-events-none absolute inset-0">
      {tickets.map((t, i) => (
        <div key={i} data-depth={t.depth} className={`${s.slot} ${t.phone ? "" : "max-sm:hidden"}`} style={vars(t)}>
          <div className={s.bob}>
            <TicketArt kind={t.kind} />
          </div>
        </div>
      ))}
    </TicketsReveal>
  );
}

// Notches a third of the way along, like a stub you could tear off.
const SHAPE = "M0 0H34A6 6 0 0 0 46 0H120V70H46A6 6 0 0 0 34 70H0Z";

function TicketArt({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" className="block h-auto w-full stroke-on-accent">
      <path d={SHAPE} className="fill-accent" stroke="none" />
      {kind === "arrow" ? <path d="M62 35h30M86 24l14 9M86 46l14-9" strokeWidth="2.4" /> : null}
      {kind === "mark" ? (
        <>
          <path d="M4 66C34 50 64 22 118 12" strokeWidth="0.9" strokeOpacity="0.7" />
          <g
            className="fill-on-accent font-wide"
            stroke="none"
            fontSize="14"
            fontWeight="800"
            letterSpacing="5"
            style={{ fontVariationSettings: "'wdth' 120" }}
          >
            <text x="9" y="23">
              PT
            </text>
            <text x="79" y="60">
              BR
            </text>
          </g>
        </>
      ) : null}
      {kind === "globe" ? (
        <>
          <path d="M2 22C40 8 92 10 118 44" strokeWidth="0.9" strokeOpacity="0.7" />
          <g strokeWidth="0.7" strokeOpacity="0.85">
            <circle cx="22" cy="46" r="10" />
            <ellipse cx="22" cy="46" rx="4.2" ry="10" />
            <ellipse cx="22" cy="46" rx="7.6" ry="10" />
            <path d="M22 36v20M12 46h20M13.3 41h17.4M13.3 51h17.4M16.7 37.5h10.6M16.7 54.5h10.6" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
