// Self-check for the endpoint's guards: node app/api/ask/guard.check.mjs
// (Node 22.18+ strips guard.ts's types on its own).
import assert from "node:assert/strict";
import { LIMITS, isSameOrigin, limiter, parseTurns } from "./guard.ts";

const turn = (content, role = "user") => ({ role, content });
const chat = (n) => ({ messages: Array.from({ length: n }, (_, i) => turn("a", i % 2 ? "assistant" : "user")) });

// input: text only, alternating, starting and ending with the visitor, within the limits
assert.deepEqual(parseTurns({ messages: [turn("  Hi  ")] }), [{ role: "user", content: "Hi" }]);
assert.equal(parseTurns(chat(LIMITS.turns - 1)).length, 7);
assert.equal(parseTurns(chat(LIMITS.turns + 1)), null);
assert.equal(parseTurns(chat(2)), null); // ends on an answer
assert.equal(parseTurns(chat(0)), null);
assert.equal(parseTurns({ messages: [turn("a"), turn("b")] }), null); // not alternating
assert.equal(parseTurns({ messages: [turn("x", "system")] }), null);
assert.equal(parseTurns({ messages: [turn("   ")] }), null);
assert.equal(parseTurns({ messages: [turn("x".repeat(LIMITS.chars + 1))] }), null);
assert.ok(parseTurns({ messages: [turn("x".repeat(LIMITS.chars))] }));
assert.equal(parseTurns({ messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }] }), null);
assert.equal(parseTurns({ messages: [null] }), null);
assert.equal(parseTurns(null), null);
assert.equal(parseTurns("hi"), null);

// origin: this site, the host it was reached on, or localhost in development
const site = "https://pedro.example";
const from = (headers) => isSameOrigin(new Headers(headers), site, false);
assert.ok(from({ origin: site }));
assert.ok(from({ referer: `${site}/work` }));
assert.ok(from({ origin: "https://preview.vercel.app", host: "preview.vercel.app" }));
assert.ok(!from({ origin: "https://evil.example", host: "pedro.example" }));
assert.ok(!from({ origin: "null" }));
assert.ok(!from({}));
assert.ok(!from({ origin: "http://localhost:3311" }));
assert.ok(isSameOrigin(new Headers({ origin: "http://localhost:3311" }), site, true));

// rate limit: per IP within its window, then the instance-wide cap
const allow = limiter({ perIp: 2, ipWindow: 1000, total: 3, totalWindow: 5000 });
assert.ok(allow("a", 0) && allow("a", 1));
assert.ok(!allow("a", 2));
assert.ok(allow("a", 1001)); // the window slid past the first two
assert.ok(!allow("b", 1002)); // three in five seconds for the instance
assert.ok(allow("b", 5001));

console.log("ask guard: ok");
