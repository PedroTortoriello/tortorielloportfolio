import type { DockIcon } from "@/lib/data";

// Line glyphs drawn for the dock on a 24px grid, 1.6px strokes.
const paths: Record<DockIcon, React.ReactNode> = {
  home: <path d="M4 10.4 12 4l8 6.4V19a1.4 1.4 0 0 1-1.4 1.4h-4v-5.6H9.4v5.6h-4A1.4 1.4 0 0 1 4 19z" />,
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.7" />
      <path d="M4.8 20.4c.9-3.7 3.7-5.8 7.2-5.8s6.3 2.1 7.2 5.8" />
    </>
  ),
  // three stacked isometric cubes
  cubes: (
    <>
      <path d="M12 3.2 15.5 5.2v4L12 11.2l-3.5-2v-4z" />
      <path d="M12 7.2 8.5 5.2M12 7.2l3.5-2M12 7.2v4" />
      <path d="M8.5 9.2 12 11.2v4l-3.5 2-3.5-2v-4z" />
      <path d="M8.5 13.2 5 11.2M8.5 13.2l3.5-2M8.5 13.2v4" />
      <path d="M15.5 9.2 19 11.2v4l-3.5 2-3.5-2" />
      <path d="M15.5 13.2 12 11.2M15.5 13.2l3.5-2M15.5 13.2v4" />
    </>
  ),
  // a ruler and a pencil, crossed
  tools: (
    <>
      <path d="m3.6 16.9 13.3-13.3 3.5 3.5L7.1 20.4z" />
      <path d="m7 13.5 1.6 1.6M9.6 10.9l1.6 1.6M12.2 8.3l1.6 1.6" />
      <path d="M5.2 3.6 3.6 5.2l12.6 12.6 3.8 2.2-2.2-3.8z" />
    </>
  ),
  // a branch graph: history with a fork
  path: (
    <>
      <circle cx="6.5" cy="5" r="2" />
      <circle cx="6.5" cy="19" r="2" />
      <circle cx="17.5" cy="8.5" r="2" />
      <path d="M6.5 7v10M17.5 10.5c0 4.2-6.6 3.2-10.2 6.6" />
    </>
  ),
  // a paper plane
  signal: (
    <>
      <path d="M20.6 3.4 3.5 10.1l6.8 3.1 3.1 6.8z" />
      <path d="m20.6 3.4-10.3 9.8" />
    </>
  ),
};

export function DockGlyph({ name, className }: { name: DockIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
