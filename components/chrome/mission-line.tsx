// The security thread through the content: a windowed thread in the left gutter
// that runs from the first section (Projetos) to the last before the close,
// passing through every section's window (SectionHeader puts them on this x).
// The dashed thread shows the route; its printed core is drawn by the scroll,
// its tip riding about two thirds down the screen. From lg up.
export function MissionLine() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="container-x relative h-full">
        <div
          data-draw="scrub"
          data-start="top 65%"
          data-end="bottom 65%"
          className="absolute inset-y-0 left-[calc(clamp(1.25rem,4vw,3rem)-1.5rem)] w-px [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)]"
        >
          <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgb(122_20_36/0.32)_0_18px,transparent_18px_34px)]" />
          <svg viewBox="0 0 2 1000" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible text-accent">
            <line x1="1" y1="0" x2="1" y2="1000" className="draw" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  );
}
