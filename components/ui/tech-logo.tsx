/* eslint-disable @next/next/no-img-element */

type TechLogoProps = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  /** Force the logo to a uniform light monochrome (default). */
  mono?: boolean;
};

// SVG brand logos (CDN + local). Plain <img>: SVGs need no optimization and
// next/image blocks remote SVGs by default. Whitened so a wall of colored
// brand marks doesn't break the near-monochrome palette.
export function TechLogo({ src, alt, className = "", eager = false, mono = true }: TechLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      width={28}
      height={28}
      className={`${mono ? "[filter:brightness(0)_invert(1)]" : ""} ${className}`}
    />
  );
}
