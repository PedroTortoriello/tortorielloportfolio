import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  withArrow?: boolean;
  className?: string;
};

const styles = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary:
    "border border-border-strong text-ink hover:bg-surface-2",
  ghost:
    "text-ink-muted hover:text-ink",
};

// Clean link/button. No magnetic, no glow — just a precise hover.
export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  withArrow = false,
  className = "",
}: ButtonProps) {
  const externalProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  const isInline = variant === "ghost";

  return (
    <Link
      href={href}
      {...externalProps}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
        isInline ? "" : "px-5 py-3"
      } ${styles[variant]} ${className}`}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}
