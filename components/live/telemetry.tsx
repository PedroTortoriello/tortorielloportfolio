"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Telemetry as Data } from "@/app/api/telemetry/route";
import { useLocale } from "@/lib/i18n/client";
import { HTML_LANG, type Locale } from "@/lib/i18n/locale";

const COPY = {
  en: {
    live: "Live",
    stale: "Snapshot",
    checked: "checked",
    products: "Products",
    up: "up",
    avg: "avg",
    contributions: "Contributions, last year",
    push: "Last public push",
    languages: "Top languages, by repo",
    repos: "Public repos",
    newTab: " (opens in a new tab)",
  },
  pt: {
    live: "Ao vivo",
    stale: "Em cache",
    checked: "verificado",
    products: "Produtos",
    up: "no ar",
    avg: "média",
    contributions: "Contribuições no último ano",
    push: "Último push público",
    languages: "Principais linguagens, por repo",
    repos: "Repositórios públicos",
    newTab: " (abre em nova aba)",
  },
} as const;

const FRESH = 3_600_000; // older than an hour, it is a snapshot, not "live"
// "3h ago" / "há 3 h", "yesterday" / "ontem", "now" / "agora"
const RTF = {
  en: new Intl.RelativeTimeFormat(HTML_LANG.en, { numeric: "auto", style: "narrow" }),
  pt: new Intl.RelativeTimeFormat(HTML_LANG.pt, { numeric: "auto", style: "narrow" }),
};
const UNITS = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
] as const;

// "3h ago", "12d ago", "now": always relative to the moment the data arrived.
function ago(iso: string, now: number, locale: Locale) {
  const rtf = RTF[locale];
  const s = Math.min(0, (Date.parse(iso) - now) / 1000);
  for (const [unit, size] of UNITS) if (-s >= size) return rtf.format(Math.round(s / size), unit);
  return rtf.format(0, "second");
}

type State = { at: number; d: Data } | "error" | null;

// The instrument panel beside "View all projects": real GitHub activity and an
// uptime check of each case's live site, fetched once when the panel nears the
// viewport. The skeleton has the same rows, so nothing moves when data lands;
// an unknown value stays a muted dash, and a failed request shows nothing.
export function Telemetry({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>(null);
  const locale = useLocale();
  const copy = COPY[locale];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctrl = new AbortController();
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        fetch("/api/telemetry", { signal: ctrl.signal })
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((d: Data) => setState(Array.isArray(d?.uptime) ? { at: Date.now(), d } : "error"))
          .catch(() => {
            if (!ctrl.signal.aborted) setState("error");
          });
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctrl.abort();
    };
  }, []);

  if (state === "error") return null;
  const d = state?.d;
  const known = d?.uptime.some((u) => u.status !== null);
  // nothing true to show: no panel rather than a panel of dashes
  if (d && !d.github && !known) return null;

  const now = state?.at ?? 0;
  const fresh = d ? now - Date.parse(d.checkedAt) < FRESH : false;
  const up = d?.uptime.filter((u) => u.up) ?? [];
  const ms = up.length ? Math.round(up.reduce((sum, u) => sum + (u.ms ?? 0), 0) / up.length) : null;
  const gh = d?.github;

  return (
    <div ref={ref} className={`border border-line-strong p-5 print:hidden [html:not(.js)_&]:hidden ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="t-label flex items-center gap-2.5 text-ink">
          <span aria-hidden className="relative grid size-2 place-items-center">
            {fresh ? (
              <span className="motion-only absolute inset-0 animate-[ping-soft_2.4s_ease-out_infinite] rounded-full bg-accent" />
            ) : null}
            <span className={`relative size-1.5 rounded-full ${fresh ? "bg-accent" : "bg-ink-faint"}`} />
          </span>
          {d && !fresh ? copy.stale : copy.live}
        </p>
        <p className="t-label tabular">{d ? `${copy.checked} ${ago(d.checkedAt, now, locale)}` : <Skeleton className="w-24" />}</p>
      </div>

      <dl aria-live="polite" aria-busy={!d} className="mt-4 grid gap-x-8 gap-y-4 border-t border-line pt-4 md:grid-cols-2 lg:grid-cols-1">
        <Row label={copy.products} loading={!d}>
          {known ? (
            <>
              <span aria-hidden className="flex shrink-0 gap-1">
                {d!.uptime.map((u) => (
                  <span key={u.title} className={`size-1.5 rounded-full ${u.up ? "bg-accent" : "bg-ink-faint"}`} />
                ))}
              </span>
              <span className="truncate">
                {up.length}/{d!.uptime.length} {copy.up}
                {ms !== null ? ` · ${copy.avg} ${ms} ms` : null}
              </span>
            </>
          ) : null}
        </Row>
        <Row label={copy.contributions} loading={!d}>
          {d?.contributions != null ? <span className="tabular">{d.contributions.toLocaleString(HTML_LANG[locale])}</span> : null}
        </Row>
        <Row label={copy.push} loading={!d}>
          {gh?.lastPush ? (
            <>
              <span className="shrink-0">{ago(gh.lastPush.at, now, locale)} ·</span>
              {/* the ::before stretches the hit area to ~44px tall without moving the rows */}
              <a
                href={gh.lastPush.url}
                target="_blank"
                rel="noreferrer"
                className="group/repo relative flex min-w-0 items-center gap-1 normal-case tracking-normal transition-colors before:absolute before:inset-x-0 before:-inset-y-3.5 hover:text-accent"
              >
                <span className="link-draw truncate">{gh.lastPush.repo}</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-3 shrink-0 text-ink-muted transition-colors group-hover/repo:text-accent"
                />
                <span className="sr-only">{copy.newTab}</span>
              </a>
            </>
          ) : null}
        </Row>
        <Row label={copy.languages} loading={!d}>
          {gh?.languages.length ? <span className="truncate">{gh.languages.map((l) => `${l.name} ${l.repos}`).join(" · ")}</span> : null}
        </Row>
        <Row label={copy.repos} loading={!d}>
          {gh ? <span className="tabular">{gh.repos}</span> : null}
        </Row>
      </dl>
    </div>
  );
}

// One readout: a mono label over a single-line value (truncated, never wrapped,
// so the panel keeps its height). A missing value is a muted dash.
function Row({ label, loading, children }: { label: string; loading: boolean; children: ReactNode }) {
  const empty = children == null;
  return (
    <div className="min-w-0">
      <dt className="t-label">{label}</dt>
      <dd className={`t-label mt-1.5 flex min-w-0 items-center gap-2 whitespace-nowrap ${empty ? "" : "text-ink"}`}>
        {loading ? <Skeleton className="w-3/4" /> : empty ? "—" : children}
      </dd>
    </div>
  );
}

// A bar exactly one label line tall (1.25em), its visible part inset by padding.
function Skeleton({ className }: { className: string }) {
  return <span aria-hidden className={`block h-[1.25em] animate-pulse bg-white/10 bg-clip-content py-[0.3em] ${className}`} />;
}
