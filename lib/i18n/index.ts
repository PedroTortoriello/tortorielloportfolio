// English lives at /, Portuguese at /pt (same pages, same components).
// Server components get `locale` as a prop from their page; client components
// call useLocale() from lib/i18n/client.ts. Content comes from content(locale):
// lib/data.ts and lib/projects.ts with every translated string swapped in
// (lib/i18n/paths.ts). The /landing-pages area keeps its own Portuguese.
import * as data from "@/lib/data";
import { archive, projects } from "@/lib/projects";
import type { Locale } from "./locale";
import { localize } from "./paths";
import ptData from "./pt/data.json";
import ptCadenceflow from "./pt/cadenceflow.json";
import ptFinance from "./pt/finance-platform.json";
import ptLegal from "./pt/legal-intelligence.json";
import ptAutomation from "./pt/automation-infrastructure.json";

export * from "./locale";

const PT: Record<string, string> = { ...ptData, ...ptCadenceflow, ...ptFinance, ...ptLegal, ...ptAutomation };

type Content = typeof data & { projects: typeof projects; archive: typeof archive };

const build = (locale: Locale): Content => {
  if (locale === "en") return { ...data, projects, archive };
  const swapped = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, localize(v, `data.${k}`, PT)])) as typeof data;
  return { ...swapped, projects: localize(projects, "projects", PT), archive: localize(archive, "archive", PT) };
};

const cache = new Map<Locale, Content>();

// The site's content in a locale (built once per locale). Untranslated strings stay English.
export function content(locale: Locale): Content {
  let c = cache.get(locale);
  if (!c) cache.set(locale, (c = build(locale)));
  return c;
}

export const projectIn = (locale: Locale, slug: string) => content(locale).projects.find((p) => p.slug === slug);
