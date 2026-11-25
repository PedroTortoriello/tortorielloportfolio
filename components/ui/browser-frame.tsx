import { Lock } from "lucide-react";
import type { ReactNode } from "react";

// Desktop capture of a live page: a quiet dark browser chrome with the real
// URL. Hairlines only; on black the frame needs no shadow.
export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-[3px] border border-line-strong bg-surface ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-line bg-elevated px-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full border border-line-strong" />
          <span className="size-2 rounded-full border border-line-strong" />
          <span className="size-2 rounded-full border border-line-strong" />
        </div>
        <div className="mx-auto flex h-6 min-w-0 max-w-[80%] items-center gap-1.5 rounded-full border border-line bg-bg px-3 font-mono text-[0.6875rem] text-ink-faint">
          <Lock aria-hidden className="size-3 shrink-0" />
          {/* min-w-0 lets the flex item shrink, so a long host truncates instead of widening the frame */}
          <span className="min-w-0 truncate">{url}</span>
        </div>
        <span className="w-10" aria-hidden />
      </div>
      {children}
    </figure>
  );
}
