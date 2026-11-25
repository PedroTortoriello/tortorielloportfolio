import s from "./contact.module.css";

// The finale's opening mark: a thin tilted orbit that draws itself in, with a
// lime star travelling on it (a CSS motion path, still for reduced motion).
export function Orbit() {
  return (
    <div aria-hidden className={s.orbit}>
      <svg data-draw viewBox="0 0 190 80" width="190" height="80" fill="none" className="absolute inset-0 overflow-visible">
        <ellipse className="draw" cx="95" cy="40" rx="93" ry="38" stroke="white" strokeOpacity="0.22" />
      </svg>
      <svg
        viewBox="-17 -17 34 34"
        width="34"
        height="34"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        className={`${s.star} text-accent`}
      >
        {/* eight rays of uneven length, like a hand-drawn sparkle */}
        <path d="M-14.7-3.1 14.7 3.1M-6.5-10.1 6.5 10.1M2.8-15.8-2.8 15.8M9.3-5.8-9.3 5.8" />
        <circle r="1.5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
