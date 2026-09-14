import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.85rem] md:leading-[1.05]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
