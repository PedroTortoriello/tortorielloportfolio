// Self-check for lib/pix.ts: run with `node scripts/check-pix.ts` (Node 22.6+).
import assert from "node:assert/strict";
import { crc16, pixAnatomy } from "../lib/pix.ts";

assert.equal(crc16("123456789"), "29B1"); // CRC-16/CCITT-FALSE check value
const { payload, segments } = pixAnatomy({ key: "k", name: "A", city: "B", amount: 1, txid: "T" });
assert.ok(payload.startsWith("000201"));
assert.equal(payload.slice(-4), crc16(payload.slice(0, -4)));
assert.equal(segments.map((s) => s.raw).join(""), payload);
console.log("pix ok", payload);
