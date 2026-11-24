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
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-ui text-[0.9375rem] font-[620] [font-variation-settings:'wdth'_104] transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98]";

// Primary is the one ink: an intaglio bordô plate with paper-white text, a soft
// printed drop under it. Secondary is the same ink as a hairline outline.
const variants = {
  primary:
    "h-12 px-6 bg-accent text-on-accent shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),0_10px_24px_-14px_rgb(92_14_26/0.9)] hover:bg-accent-deep",
  secondary: "h-12 px-6 border border-accent text-accent hover:bg-accent hover:text-on-accent",
  ghost: "h-9 px-1 text-ink-muted hover:text-ink",
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
