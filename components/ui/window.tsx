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

// A development-tool window: traffic lights, file tab, optional status bar.
export function Window({ title, meta, status, children, className = "", bodyClassName = "", label }: WindowProps) {
  return (
    <figure className={`window overflow-hidden ${className}`} aria-label={label}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-elevated/70 px-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/85" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/85" />
          <span className="size-2.5 rounded-full bg-[#28c840]/85" />
        </div>
        <div className="min-w-0 flex-1 truncate font-mono text-[0.72rem] text-ink-muted">{title}</div>
        {meta ? <div className="shrink-0 font-mono text-[0.68rem] text-ink-faint">{meta}</div> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
      {status ? (
        <div className="flex h-7 items-center gap-4 border-t border-line bg-elevated/50 px-3.5 font-mono text-[0.66rem] text-ink-faint">
          {status}
        </div>
      ) : null}
    </figure>
  );
}
