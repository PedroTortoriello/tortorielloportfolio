"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { REDUCE } from "@/lib/motion";
import { isStill, onStillChange } from "@/lib/still";
import { videos } from "@/lib/videos";

type Props = { slug: string; src: string; alt: string; sizes: string; preload?: boolean };

// A case's cover, filling its (positioned) box. By default the still; when the case has a clip
// (lib/videos.ts), the clip's poster, with the muted loop fading in over it once it plays. The clip
// loads only near the viewport (never with data saver on) and plays only while it is visible, in a
// visible tab, with motion allowed and not paused (html.still); otherwise the poster shows.
// data-velocity lets the layer lean with the scroll speed (globals.css), so it is never text.
export function CoverMedia({ slug, src, alt, sizes, preload }: Props) {
  const clip = videos[slug];
  const locale = useLocale();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    // data saver on: the poster is enough
    if (!v || (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
    const reduce = matchMedia(REDUCE);
    let visible = false;
    const sync = () => {
      if (reduce.matches || isStill()) {
        v.pause();
        setPlaying(false);
      } else if (visible && !document.hidden) {
        v.muted = true; // autoplay policies want the property, not only the attribute
        v.play().catch(() => {});
      } else v.pause();
    };
    // preload="none" until it is half a screen away; raising it starts the download
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        v.preload = "auto";
        near.disconnect();
      },
      { rootMargin: "50% 0px" },
    );
    const seen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    near.observe(v);
    seen.observe(v);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    const offStill = onStillChange(sync);
    return () => {
      near.disconnect();
      seen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      offStill();
    };
  }, []);

  return (
    <div data-velocity className="absolute inset-0">
      <Image
        src={clip?.poster ?? src}
        alt={alt && clip ? clip.alt[locale] : alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
      {clip ? (
        <video
          ref={ref}
          aria-hidden
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          {clip.webm ? <source src={clip.webm} type='video/webm; codecs="vp9"' /> : null}
          {clip.mp4 ? <source src={clip.mp4} type="video/mp4" /> : null}
        </video>
      ) : null}
    </div>
  );
}
