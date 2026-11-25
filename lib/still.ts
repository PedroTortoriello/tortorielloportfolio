// "Pause motion" (WCAG 2.2.2): html.still settles every looping animation
// (app/globals.css) and stops the orb on its frame (components/hero/orb.tsx).
// The choice is kept for later visits; the <head> script in app/layout.tsx restores it.
// Anything that animates on its own listens to STILL_EVENT or checks isStill().
export const STILL_EVENT = "pt:still";

export const isStill = () => document.documentElement.classList.contains("still");

export const onStillChange = (cb: () => void) => {
  window.addEventListener(STILL_EVENT, cb);
  return () => window.removeEventListener(STILL_EVENT, cb);
};

export function toggleStill() {
  const on = document.documentElement.classList.toggle("still");
  try {
    if (on) localStorage.setItem("pt-still", "1");
    else localStorage.removeItem("pt-still");
  } catch {
    /* storage blocked: it holds for this visit only */
  }
  // Paused during the opening (a screen reader or voice control can reach the button while the header is
  // hidden): end the opening first, so the orb freezes on the hero, not on a half-formed frame.
  if (on) window.dispatchEvent(new Event("pt:intro-end"));
  window.dispatchEvent(new Event(STILL_EVENT));
}
