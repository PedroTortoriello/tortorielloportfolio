import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  arrow?: "right" | "out" | "none";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px";

const variants = {
  primary:
    "h-11 px-5 bg-blue-fill text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_0_0_1px_rgb(67_136_255/0.6),0_8px_24px_-8px_rgb(45_108_234/0.7)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_0_0_1px_rgb(110_165_255/0.9),0_10px_32px_-6px_rgb(45_108_234/0.95)]",
  secondary:
    "h-11 px-5 border border-line-strong bg-surface/60 text-ink hover:border-blue/60 hover:bg-elevated",
  ghost: "h-9 px-1 text-ink-muted hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  arrow = "none",
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow === "right" && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
      {arrow === "out" && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  // External targets (the CV PDF, other sites) are plain anchors: no router prefetch.
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {inner}
    </Link>
  );
}

// Inline text link with an animated underline, used inside cases and lists.
export function TextLink({
  href,
  children,
  external = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const ext = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a
      href={href}
      {...ext}
      className={`group inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-blue ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight aria-hidden className="size-3.5 text-ink-faint transition-colors group-hover:text-blue" />
    </a>
  );
}
