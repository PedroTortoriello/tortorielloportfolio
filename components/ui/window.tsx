import type { ReactNode } from "react";

type WindowProps = {
  title: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  label?: string;
};

// A code/instrument window: floats above the page (the only panels with a
// drop), mono file path in the header strip, optional status bar.
export function Window({ title, meta, status, children, className = "", bodyClassName = "", label }: WindowProps) {
  return (
    <figure className={`window ticks overflow-hidden ${className}`} aria-label={label}>
      <div className="console-head bg-elevated/60">
        <span aria-hidden className="size-[7px] shrink-0 rounded-[1px] border border-blue/70" />
        <div className="min-w-0 flex-1 truncate font-mono text-[0.72rem] text-ink-muted">{title}</div>
        {meta ? <div className="shrink-0 font-mono text-[0.6875rem] text-ink-faint">{meta}</div> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
      {status ? (
        <div className="flex h-7 items-center gap-4 border-t border-line bg-elevated/40 px-3.5 font-mono text-[0.625rem] text-ink-faint">
          {status}
        </div>
      ) : null}
    </figure>
  );
}
