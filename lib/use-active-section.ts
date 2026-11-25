"use client";

import { useEffect, useState } from "react";

// The section that crosses the middle line of the viewport. One observer per
// caller; the header and the dock each keep their own.
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState("");
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, enabled]);

  return enabled ? active : "";
}
