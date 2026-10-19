// The mission trajectory through the content: one line in the left gutter that
// runs from the first station (Projetos) to the last before the close, passing
// through every section's station node (SectionHeader puts them on this x).
// A dim track shows the route; the lit line is drawn by the scroll, its tip
// riding about two thirds down the screen. From lg up, where the gutter has room.
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
          <span className="absolute inset-0 bg-line-faint" />
          <svg viewBox="0 0 2 1000" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible text-blue">
            <line x1="1" y1="0" x2="1" y2="1000" className="draw" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  );
}
