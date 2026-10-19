import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`window overflow-hidden ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-line bg-elevated/80 px-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-ink-faint/40" />
          <span className="size-2 rounded-full bg-ink-faint/40" />
          <span className="size-2 rounded-full bg-ink-faint/40" />
        </div>
        <div className="mx-auto flex h-6 min-w-0 max-w-[80%] items-center gap-1.5 rounded-md border border-line bg-bg/60 px-2.5 font-mono text-[0.66rem] text-ink-faint">
          <Lock aria-hidden className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        <span className="w-10" aria-hidden />
      </div>
      {children}
    </figure>
  );
}

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.6rem] border border-line-strong bg-elevated p-1.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.03)_inset] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.2rem]">{children}</div>
    </figure>
  );
}
