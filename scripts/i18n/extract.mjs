// Lists every translatable string of the content files as { key: english }.
// Run: node scripts/i18n/extract.mjs > strings.json   (Node 24 strips the TS types)
// Keys come from lib/i18n/paths.ts, the same walk localize() uses at render time.
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const load = (f) => import(pathToFileURL(resolve(f)).href);
const { mapStrings } = await load("lib/i18n/paths.ts");
const data = await load("lib/data.ts");
const { projects, archive } = await load("lib/projects.ts");

const out = {};
const take = (value, root) => mapStrings(value, root, (path, text) => void (out[path] = text));
for (const [name, value] of Object.entries(data)) take(value, `data.${name}`);
take(projects, "projects");
take(archive, "archive");

process.stdout.write(JSON.stringify(out, null, 2) + "\n");
