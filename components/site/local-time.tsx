"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});
const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 10_000);
  return () => window.clearInterval(id);
};

// Real local time in São Paulo. "--:--" on the server, the clock after hydration.
export function LocalTime() {
  const t = useSyncExternalStore(
    subscribe,
    () => fmt.format(Date.now()),
    () => "--:--",
  );
  return <span className="tabular">{t}</span>;
}
