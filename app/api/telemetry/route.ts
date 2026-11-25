import { projects } from "@/lib/projects";

// Live telemetry for the Work section: Pedro's public GitHub activity and an
// uptime check of each case's live URL. Regenerated at most every 10 minutes
// (ISR). Any failure (rate limit, timeout, a site down) degrades to partial
// data; the route itself never fails.
export const runtime = "nodejs";
// force-static keeps the route on ISR even though the probes opt out of the
// fetch cache (a cached probe would report a cache read as response time).
export const dynamic = "force-static";
export const revalidate = 600;

const USER = "PedroTortoriello";
const TIMEOUT = 5000;
const UA = "portfolio-telemetry";

export type Telemetry = {
  checkedAt: string;
  github: {
    repos: number;
    lastPush: { repo: string; url: string; at: string } | null;
    languages: { name: string; repos: number }[]; // primary language, counted by repo
  } | null;
  uptime: { title: string; up: boolean; status: number | null; ms: number | null }[];
};

type Repo = { name: string; fork: boolean; disabled?: boolean; language: string | null; pushed_at: string | null };

// One request covers it all; unauthenticated it shares the 60/h limit, so the
// response is cached for 10 minutes. GITHUB_TOKEN, when set, lifts the limit.
async function github(): Promise<Telemetry["github"]> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/users/${USER}/repos?type=owner&sort=pushed&per_page=100`, {
    headers: {
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
      "user-agent": UA,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 600 },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) return null;
  const all: unknown = await res.json();
  if (!Array.isArray(all)) return null;
  // ponytail: one page of 100 repos; follow the Link header past that.
  const own = (all as Repo[]).filter((r) => !r.fork && !r.disabled);
  const count = new Map<string, number>();
  for (const r of own) if (r.language) count.set(r.language, (count.get(r.language) ?? 0) + 1);
  const last = own.find((r) => r.pushed_at); // sorted by push, newest first
  return {
    repos: all.length,
    lastPush: last ? { repo: last.name, url: `https://github.com/${USER}/${encodeURIComponent(last.name)}`, at: last.pushed_at! } : null,
    languages: [...count]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 3)
      .map(([name, repos]) => ({ name, repos })),
  };
}

// HEAD first (no body to download), GET when a server refuses HEAD. Redirects
// are followed: "up" means a visitor would get the page (2xx).
async function probe(url: string) {
  let status: number | null = null;
  for (const method of ["HEAD", "GET"]) {
    const t0 = performance.now();
    try {
      const res = await fetch(url, { method, cache: "no-store", headers: { "user-agent": UA }, signal: AbortSignal.timeout(TIMEOUT) });
      const ms = Math.round(performance.now() - t0);
      res.body?.cancel().catch(() => {}); // free the socket, the body is not needed
      if (res.ok) return { up: true, status: res.status, ms };
      status = res.status;
    } catch {
      // timeout or network error: try GET, then give up
    }
  }
  return { up: false, status, ms: null };
}

export async function GET() {
  const live = projects.filter((p) => p.links[0]?.href.startsWith("https://"));
  const [gh, uptime] = await Promise.all([
    github().catch(() => null),
    Promise.all(live.map(async (p) => ({ title: p.title, ...(await probe(p.links[0].href)) }))),
  ]);
  return Response.json({ checkedAt: new Date().toISOString(), github: gh, uptime } satisfies Telemetry);
}
