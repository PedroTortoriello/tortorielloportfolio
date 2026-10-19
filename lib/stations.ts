"use client";

import { useSyncExternalStore } from "react";

// Which section ("station") the reader is in. Written by MissionRail's
// ScrollTriggers, read by the header nav: one source for every active state.
let active = "";
const subs = new Set<() => void>();

export function setActiveStation(id: string) {
  if (id === active) return;
  active = id;
  subs.forEach((f) => f());
}

const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
};

export function useActiveStation() {
  return useSyncExternalStore(subscribe, () => active, () => "");
}
