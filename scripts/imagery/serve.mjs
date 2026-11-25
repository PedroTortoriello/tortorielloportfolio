// The imagery lab: serves lab.html and saves what it renders into public/work.
// Dev tool only (never deployed): `node scripts/imagery/serve.mjs`, open
// http://localhost:3399, then call render("<scene>") and save("<scene>") in the console.
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "../../public/work");
const port = Number(process.env.PORT) || 3399;

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://lab");
  if (req.method === "POST" && url.pathname === "/save") {
    const name = basename(url.searchParams.get("name") ?? "");
    if (!/^[a-z0-9-]+\.(webp|png|jpg)$/.test(name)) return res.writeHead(400).end("bad name");
    const chunks = [];
    for await (const c of req) chunks.push(c);
    await mkdir(out, { recursive: true });
    await writeFile(join(out, name), Buffer.concat(chunks));
    return res.writeHead(200).end(`saved ${name}`);
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(await readFile(join(here, "lab.html")));
}).listen(port, "127.0.0.1", () => console.log(`imagery lab on http://localhost:${port}`));
