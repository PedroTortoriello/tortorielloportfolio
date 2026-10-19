const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const ruler = Array.from({ length: 23 }, (_, i) => 204 + i * 24);

// Architectural layer of the front wall: datum lines that overshoot, a ruler
// and registration marks. Pure SVG. The trajectory itself launches from the
// last specialty station (see Launch in hero.tsx).
export function FrontWall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>

      {/* datum lines: they overshoot the frame like a drafting sheet */}
      <g stroke="#244561" strokeWidth="1" className="enter-fade" style={d(150)}>
        <line x1="0" y1="176" x2="1440" y2="176" strokeOpacity="0.55" />
        <line x1="0" y1="742" x2="1440" y2="742" strokeOpacity="0.4" />
        <line x1="804" y1="96" x2="804" y2="900" strokeOpacity="0.45" />
        <line x1="1378" y1="96" x2="1378" y2="900" strokeOpacity="0.3" />
      </g>

      {/* registration marks where the datums cross */}
      <g stroke="#5e9eff" strokeOpacity="0.7" strokeWidth="1" className="enter-fade" style={d(500)}>
        {[
          [804, 176],
          [1378, 176],
          [804, 742],
          [1378, 742],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 7},${y} H${x + 7} M${x},${y - 7} V${y + 7}`} />
        ))}
      </g>

      {/* vertical ruler on the right datum */}
      <g className="enter-fade" style={d(400)}>
        {ruler.map((y, i) => (
          <line
            key={y}
            x1={1378}
            x2={i % 5 === 0 ? 1390 : 1384}
            y1={y}
            y2={y}
            stroke={i % 5 === 0 ? "#355c7e" : "#244561"}
            strokeWidth="1"
          />
        ))}
        {ruler
          .filter((_, i) => i % 5 === 0)
          .map((y) => (
            <text key={y} x={1396} y={y + 3.5} fill="#7c8aa0" fontSize="10" letterSpacing="0.08em" className="font-mono">
              {String(y - 204).padStart(3, "0")}
            </text>
          ))}
      </g>

    </svg>
  );
}
