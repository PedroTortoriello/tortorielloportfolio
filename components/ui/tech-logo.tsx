/* eslint-disable @next/next/no-img-element */

type TechLogoProps = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  /** Print the logo in ink, one colour (default). */
  mono?: boolean;
};

// SVG brand logos (CDN + local). Plain <img>: SVGs need no optimization and
// next/image blocks remote SVGs by default. Printed in ink so a wall of colored
// brand marks doesn't break the paper's palette; callers dim it with opacity.
// It is a printed label, so it never drags or gets selected.
export function TechLogo({ src, alt, className = "", eager = false, mono = true }: TechLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      draggable={false}
      width={28}
      height={28}
      className={`shrink-0 select-none object-contain ${mono ? "[filter:brightness(0)]" : ""} ${className}`}
    />
  );
}
