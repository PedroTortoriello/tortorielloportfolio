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
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[6px] text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98]";

// Primary is the page's one light: luminous blue with dark ink (AA), lit from
// inside, with a sheen that crosses it on hover.
const variants = {
  primary:
    "h-12 px-6 bg-blue text-on-blue shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_0_0_1px_rgb(141_186_255/0.5),0_12px_32px_-12px_rgb(94_158_255/0.75)] hover:bg-blue-bright hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_0_0_1px_rgb(141_186_255/0.8),0_16px_40px_-12px_rgb(94_158_255/0.9)] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[180%] before:skew-x-[-18deg] before:bg-white/35 before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[420%] motion-reduce:before:hidden",
  secondary: "h-12 px-6 border border-line-strong bg-surface/60 text-ink hover:border-blue/70 hover:bg-elevated",
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
      className={`group inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-blue ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight aria-hidden className="size-3.5 text-ink-faint transition-colors group-hover:text-blue" />
    </a>
  );
}
