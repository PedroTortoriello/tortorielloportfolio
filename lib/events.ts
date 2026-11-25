// Site-wide UI events, so any component can open the command palette, the
// terminal or the "Ask the portfolio" chat without importing it.
export const UI = { palette: "pt:palette", terminal: "pt:terminal", ask: "pt:ask" } as const;
export type UIName = keyof typeof UI;

export const openUI = (name: UIName) => window.dispatchEvent(new Event(UI[name]));

export const onUI = (name: UIName, cb: () => void) => {
  window.addEventListener(UI[name], cb);
  return () => window.removeEventListener(UI[name], cb);
};
