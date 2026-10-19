import type { ReactNode } from "react";
import type { Readout } from "@/lib/projects";

type ConsoleProps = {
  label: ReactNode;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  ariaLabel?: string;
};

// A control-room console: hairline frame, blue registration ticks on the
// corners, a mono header strip. Flat on the page; only floating instruments
// (windows, devices) cast a shadow.
export function Console({ label, status, children, className = "", bodyClassName = "", ariaLabel }: ConsoleProps) {
  return (
    <div className={`console ticks ${className}`} role={ariaLabel ? "group" : undefined} aria-label={ariaLabel}>
      <div className="console-head">
        <span className="hud min-w-0 truncate">{label}</span>
        {status ? <span className="hud ml-auto shrink-0">{status}</span> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

// "No ar": the product answers at this address. Live is lit in the one blue.
export function LiveDot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-1.5 rounded-full bg-blue shadow-[0_0_8px_rgb(94_158_255/0.9)]" aria-hidden />
      {children}
    </span>
  );
}

// Parameters read from a project's code, printed like console readouts. Each
// value lands with a bloom when the block enters (data-print / data-line).
export function Readouts({ items, className = "" }: { items: Readout[]; className?: string }) {
  return (
    <dl data-print className={`grid grid-cols-1 border-y border-line sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {items.map((r, i) => (
        <div
          key={r.k}
          data-line
          className={`border-line px-0 py-4 sm:px-4 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 1 ? "sm:border-t xl:border-t-0" : ""} ${i === 2 ? "xl:border-l" : ""}`}
        >
          <dt className="hud">{r.k}</dt>
          <dd className="mt-2 font-mono text-[0.8125rem] leading-snug text-ink">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
