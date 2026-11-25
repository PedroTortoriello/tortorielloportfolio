// Path-keyed translation for the content files (lib/data.ts, lib/projects.ts).
// Every translatable string gets a stable key from its place in the data, e.g.
// "projects.cadenceflow.architecture.layers.2.detail" or "data.experience.bradesco.role".
// Arrays of objects with a slug or id are keyed by it, other arrays by index, so
// reordering cases or roles never shifts a translation onto the wrong text.
// scripts/i18n/extract.mjs lists the keys; localize() swaps them at render time.

// Keys whose values are identifiers, URLs, names or tech labels: never translated.
const SKIP = new Set([
  "slug",
  "id",
  "href",
  "src",
  "url",
  "from",
  "to",
  "tone",
  "style",
  "icon",
  "email",
  "linkedin",
  "github",
  "cv",
  "cvLang",
  "cvPt",
  "cvPtLang",
  "initials",
  "name",
  "fullName",
  "company",
  "stack",
  "tech",
  "items",
  "status",
  "index",
  "year",
  "start",
  "webm",
  "mp4",
  "poster",
  // recommendations are quoted word for word; their own lang says which language they are in
  "quote",
  "lang",
]);

type Visit = (path: string, value: string) => string | undefined;

const keyOf = (item: unknown, i: number) => {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.slug === "string") return o.slug;
    if (typeof o.id === "string") return o.id;
  }
  return String(i);
};

// Walks every string leaf that may be translated; a visitor that returns a string replaces it.
export function mapStrings<T>(value: T, path: string, visit: Visit): T {
  if (typeof value === "string") return (visit(path, value) ?? value) as T;
  if (Array.isArray(value)) return value.map((v, i) => mapStrings(v, `${path}.${keyOf(v, i)}`, visit)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    // a graph tier's "name" is a caption ("Client", "Core"), not a proper name: translate it
    const skip = (k: string) => SKIP.has(k) && !(k === "name" && path.includes(".tiers."));
    for (const [k, v] of Object.entries(value)) out[k] = skip(k) ? v : mapStrings(v, `${path}.${k}`, visit);
    return out as T;
  }
  return value;
}

// The same data with every key found in the table swapped; missing keys stay English.
export const localize = <T>(value: T, root: string, table: Record<string, string>) => mapStrings(value, root, (path) => table[path]);
