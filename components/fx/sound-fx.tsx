"use client";

import { useEffect } from "react";
import { mountSound, playCue } from "@/lib/sound";

// What activates (mouse, touch and keyboard all end in a click event), and what answers a passing pointer.
const PRESS = 'a[href], button, [role="button"], [role="link"], [role="menuitem"], [role="option"], [role="tab"], summary';
const HOVER = "[data-magnetic], .dock a";

// The sound layer: mounts the engine (lib/sound.ts), plays "click" when a link or button activates and a
// "hover" when a pointer reaches a magnetic element or a dock item. playCue is silent while sound is off.
export function SoundFx() {
  useEffect(() => {
    const unmount = mountSound();
    const onClick = (e: MouseEvent) => {
      // After the click's own handlers: the toggle that just turned sound on is heard, the one that turned it off is not.
      if (e.target instanceof Element && e.target.closest(PRESS)) setTimeout(() => playCue("click"));
    };
    const onOver = (e: PointerEvent) => {
      const el = e.pointerType !== "touch" && e.target instanceof Element ? e.target.closest(HOVER) : null;
      // entering it, not moving between its children; playCue throttles the rest
      if (el && !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) playCue("hover");
    };
    window.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onOver, true);
    return () => {
      unmount();
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onOver, true);
    };
  }, []);

  return null;
}
