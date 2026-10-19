"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// false on the server and during hydration, then the real preference.
export function useMotionOk() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(query).matches,
    () => false,
  );
}
