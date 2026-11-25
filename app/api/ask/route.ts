import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, askEnabled } from "@/lib/knowledge";
import { SITE_URL } from "@/lib/site";
import { LIMITS, isSameOrigin, limiter, parseTurns, type AskEnd, type AskEvent } from "./guard";

// "Ask the portfolio": a visitor's question, answered by Claude from the site's own
// content (lib/knowledge.ts) and streamed back as NDJSON lines (AskEvent in ./guard).
// Public, so every guard runs before a token is spent: origin, size, shape, rate, key.
export const runtime = "nodejs";
export const maxDuration = 60;

const dev = process.env.NODE_ENV !== "production";
const allow = limiter(); // 8 questions per IP per 10 min, 60 per instance per hour
let client: Anthropic | null = null;

// Short codes, never prose: the dialog shows its own words for each (components/fx/ask-dialog.tsx).
const reject = (error: string, status: number) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!isSameOrigin(req.headers, SITE_URL, dev)) return reject("forbidden", 403);
  const raw = await req.text();
  if (raw.length > LIMITS.body) return reject("too large", 413);
  let json: unknown = null;
  try {
    json = JSON.parse(raw);
  } catch {
    // not JSON: parseTurns turns the null away
  }
  const turns = parseTurns(json);
  if (!turns) return reject("invalid request", 400);
  // Vercel sets both headers itself; on a host without a proxy that does, a script could rotate them,
  // and only the per-instance cap still holds
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (!allow(ip)) return reject("rate limited", 429);
  if (!askEnabled()) return reject("not configured", 503);

  client ??= new Anthropic({ maxRetries: 1, timeout: 60_000 });
  // Thinking is always on for this model (never disabled); low effort keeps a chat answer quick.
  // A classifier decline is retried server-side on Anthropic's default fallback model.
  const stream = client.beta.messages.stream(
    {
      model: "claude-opus-5-5",
      max_tokens: 1024,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: turns,
    },
    { signal: req.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AskEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") send({ type: "text", text: event.delta.text });
        }
        const message = await stream.finalMessage();
        const u = message.usage;
        if (dev) {
          console.log(
            `[ask] ${message.stop_reason} · cache read ${u.cache_read_input_tokens ?? 0} · cache write ${u.cache_creation_input_tokens ?? 0} · input ${u.input_tokens} · output ${u.output_tokens}`,
          );
        }
        // a refusal means the fallback model declined too; the dialog drops any partial text
        if (message.stop_reason === "refusal") console.warn(`[ask] refusal · ${message.stop_details?.category ?? "uncategorized"}`);
        send({ type: "end", status: endOf(message.stop_reason) });
      } catch (err) {
        if (err instanceof Anthropic.APIUserAbortError) return; // the visitor pressed stop or left
        send({ type: "end", status: failure(err) });
      }
      controller.close();
    },
    cancel: () => stream.abort(),
  });

  return new Response(body, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}

const endOf = (reason: string | null): AskEnd => (reason === "refusal" ? "refusal" : reason === "max_tokens" ? "cut" : "ok");

// Upstream trouble in words the visitor can act on. The log gets the status and request id,
// never the question or the answer.
function failure(err: unknown): AskEnd {
  if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.InternalServerError) return "busy"; // 429, 5xx, 529 overloaded
  if (err instanceof Anthropic.APIError)
    console.error(`[ask] upstream ${err.status ?? "connection"} ${err.type ?? ""} ${err.requestID ?? ""}`);
  else console.error(`[ask] ${err instanceof Error ? err.name : "unknown error"}`);
  return "error";
}
