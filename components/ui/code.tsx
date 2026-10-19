// Tiny TypeScript highlighter for short, real snippets. Runs on the server;
// ships zero JS. ponytail: regex tokenizer, swap for shiki if snippets grow.

const KEYWORDS = new Set(
  "const let var function return if else export import from async await new typeof as type interface extends implements class private readonly public for of in true false null undefined void throw try catch default".split(
    " ",
  ),
);
const SQL = /\b(UPDATE|SET|WHERE|SELECT|FROM|AND|ORDER|BY|ASC|LIMIT|FOR|SKIP|LOCKED|RETURNING|IN)\b/g;

type Tok = { t: string; c?: string };

const TOKEN =
  /(\/\/.*$)|(`(?:[^`\\]|\\.)*`)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|((?<=[=(,:]\s*)\/(?![*/\s])(?:\\.|[^/\\\n])+\/[gimsuy]*)|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d])/gm;

function tokenize(line: string): Tok[] {
  const out: Tok[] = [];
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    const [all, com, tpl, str, re, num, id, ws] = m;
    if (com) out.push({ t: all, c: "text-sx-com italic" });
    else if (tpl) out.push({ t: all, c: "tpl" });
    else if (str) out.push({ t: all, c: "text-sx-str" });
    else if (re) out.push({ t: all, c: "text-sx-num" });
    else if (num) out.push({ t: all, c: "text-sx-num" });
    else if (id) {
      const next = line.slice(TOKEN.lastIndex).match(/^\s*(\(|<)/);
      if (KEYWORDS.has(id)) out.push({ t: all, c: "text-sx-kw" });
      else if (next && next[1] === "(") out.push({ t: all, c: "text-sx-fn" });
      else if (/^[A-Z]/.test(id)) out.push({ t: all, c: "text-sx-type" });
      else out.push({ t: all, c: "text-sx-id" });
    } else if (ws) out.push({ t: all });
    else out.push({ t: all, c: "text-sx-punct" });
  }
  return out;
}

function Template({ text }: { text: string }) {
  // split() with a capture group alternates [text, KEYWORD, text, ...]
  const parts = text.split(SQL);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-sx-kw">
            {p}
          </span>
        ) : (
          <span key={i} className="text-sx-str">
            {p}
          </span>
        ),
      )}
    </>
  );
}

export function CodeLines({
  code,
  start = 1,
  highlight = [],
  size = "md",
  className = "",
}: {
  code: string;
  start?: number;
  highlight?: number[];
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  const plain = (str: string) =>
    tokenize(str).map((tk, j) =>
      tk.c === "tpl" ? <Template key={j} text={tk.t} /> : <span key={j} className={tk.c}>{tk.t}</span>,
    );
  // Template literals can span lines: carry the "inside a template" state across lines.
  const rendered: React.ReactNode[] = [];
  let inTpl = false;
  for (const line of lines) {
    const ticks = (line.match(/`/g) || []).length;
    if (ticks % 2 === 1) {
      const at = inTpl ? line.indexOf("`") + 1 : line.lastIndexOf("`");
      rendered.push(
        inTpl ? (
          <>
            <Template text={line.slice(0, at)} />
            {plain(line.slice(at))}
          </>
        ) : (
          <>
            {plain(line.slice(0, at))}
            <Template text={line.slice(at)} />
          </>
        ),
      );
      inTpl = !inTpl;
    } else {
      rendered.push(inTpl ? <Template text={line} /> : plain(line));
    }
  }
  return (
    <pre className={`overflow-x-auto py-4 font-mono ${size === "xs" ? "text-[0.7rem] leading-[1.6]" : size === "sm" ? "text-[0.74rem] leading-[1.65]" : "text-[0.78rem] leading-[1.7]"} ${className}`}>
      <code className="grid min-w-max">
        {lines.map((_, i) => {
          const n = start + i;
          return (
            <span
              key={i}
              className={`grid grid-cols-[2.75rem_1fr] pr-5 ${highlight.includes(n) ? "bg-blue/[0.08] shadow-[inset_2px_0_0_var(--color-blue)]" : ""}`}
            >
              <span aria-hidden className="select-none pr-4 text-right text-ink-faint/60 tabular">
                {n}
              </span>
              <span className="whitespace-pre">{rendered[i]}</span>
            </span>
          );
        })}
      </code>
    </pre>
  );
}
