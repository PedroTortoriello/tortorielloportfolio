// The public endpoint's guards and wire format, free of Next and the SDK so that
// guard.check.mjs can run them with plain Node: `node app/api/ask/guard.check.mjs`.

export const LIMITS = {
  turns: 8, // alternating visitor/assistant turns, starting and ending with the visitor
  chars: 600, // per turn, after trimming
  body: 16_000, // characters in the whole request body
} as const;

export type Turn = { role: "user" | "assistant"; content: string };

// What the route streams back, one JSON object per line.
export type AskEnd = "ok" | "cut" | "refusal" | "busy" | "error";
export type AskEvent = { type: "text"; text: string } | { type: "end"; status: AskEnd };

// Text-only turns that alternate from the visitor and end on a question, or null.
export function parseTurns(body: unknown): Turn[] | null {
  const list = (body as { messages?: unknown } | null)?.messages;
  // an odd count: never empty, never ending on an answer
  if (!Array.isArray(list) || list.length % 2 === 0 || list.length > LIMITS.turns) return null;
  const turns: Turn[] = [];
  for (const [i, t] of list.entries()) {
    const role = i % 2 ? "assistant" : "user";
    if (t?.role !== role || typeof t.content !== "string") return null;
    const content = t.content.trim();
    if (!content || content.length > LIMITS.chars) return null;
    turns.push({ role, content });
  }
  return turns;
}

// Browsers send Origin with every POST (Referer as a fallback); it must name this site,
// or localhost in development. It stops other pages from spending the key through their
// visitors' browsers; scripts can forge both headers, which is what the rate limit is for.
export function isSameOrigin(headers: Headers, siteUrl: string, dev: boolean) {
  const from = headers.get("origin") ?? headers.get("referer");
  if (!from) return false;
  try {
    const { host, hostname } = new URL(from);
    if (dev && (hostname === "localhost" || hostname === "127.0.0.1")) return true;
    return host === new URL(siteUrl).host || host === headers.get("host");
  } catch {
    return false;
  }
}

// Sliding windows in memory: questions per visitor IP, and per server instance in total.
// ponytail: per instance, so many warm instances multiply the caps; move the counts to a
// shared store (Upstash, Vercel KV) if traffic ever needs a hard global limit.
export function limiter({ perIp = 8, ipWindow = 10 * 60_000, total = 60, totalWindow = 60 * 60_000 } = {}) {
  const hits = new Map<string, number[]>();
  let all: number[] = [];
  return (ip: string, now = Date.now()) => {
    all = all.filter((t) => now - t < totalWindow);
    const mine = (hits.get(ip) ?? []).filter((t) => now - t < ipWindow);
    if (mine.length >= perIp || all.length >= total) return false;
    mine.push(now);
    all.push(now);
    hits.set(ip, mine);
    // forget visitors whose window has passed, so the map stays small
    if (hits.size > 500) for (const [k, v] of hits) if (now - v[v.length - 1] >= ipWindow) hits.delete(k);
    return true;
  };
}
