import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  arrow?: "right" | "out" | "down" | "none";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-mono text-[0.75rem] uppercase tracking-[0.14em] transition-[background-color,border-color,color,scale] duration-300 ease-[var(--ease-out)] active:scale-[0.98]";

// The work reference's action: a square lime plate with mono caps (lime is the
// one colour that acts). Secondary is a hairline outline that turns lime on
// hover; ghost is a bare mono link. Every variant is at least 44px tall.
const variants = {
  primary: "h-12 px-6 bg-accent text-on-accent hover:bg-accent-deep",
  secondary: "h-12 px-6 border border-line-strong text-ink hover:border-accent hover:text-accent",
  ghost: "min-h-11 px-1 text-ink-muted hover:text-accent",
};

const arrows = {
  right: <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />,
  down: <ArrowDown aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />,
  out: (
    <ArrowUpRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  ),
  none: null,
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
      {arrows[arrow]}
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
      className={`group inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight aria-hidden className="size-3.5 text-ink-faint transition-colors group-hover:text-accent" />
    </a>
  );
}
