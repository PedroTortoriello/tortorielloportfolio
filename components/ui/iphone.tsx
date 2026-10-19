import Image from "next/image";
import { shotTones } from "@/lib/shot-tones";

// iPhone 15 Pro-style mockup drawn in CSS: titanium band, black bezel,
// Dynamic Island, side buttons, iOS status bar and Safari's bottom address
// bar. Geometry follows the 393x852 pt screen; every size is in container
// units (cqw) or % of the screen, so the device scales as one object.
// The status and Safari bars take the screenshot's own top/bottom colour.

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

function StatusIcons({ color }: { color: string }) {
  return (
    <span className="flex items-center gap-[1.3cqw]" style={{ color }}>
      {/* cellular */}
      <svg viewBox="0 0 18 12" className="h-[2.9cqw] w-auto" fill="currentColor" aria-hidden>
        <rect x="0" y="8" width="3" height="4" rx="0.8" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
        <rect x="10" y="3" width="3" height="9" rx="0.8" />
        <rect x="15" y="0" width="3" height="12" rx="0.8" />
      </svg>
      {/* wi-fi */}
      <svg viewBox="0 0 16 12" className="h-[2.9cqw] w-auto" fill="currentColor" aria-hidden>
        <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.2 10.2 0 0 0 8 .4 10.2 10.2 0 0 0 .8 3.3L2 4.6a8.4 8.4 0 0 1 6-2.4Z" />
        <path d="M8 5.6c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 3.8a7 7 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Z" />
        <path d="M8 9a2 2 0 0 1 1.3.5L8 11.8 6.7 9.5A2 2 0 0 1 8 9Z" />
      </svg>
      {/* battery */}
      <svg viewBox="0 0 27 12" className="h-[2.9cqw] w-auto" aria-hidden>
        <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="20" height="8" rx="2" fill="currentColor" />
        <path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.45" />
      </svg>
    </span>
  );
}

type IPhoneProps = {
  src: string;
  alt?: string;
  /** Domain shown in Safari's address bar. */
  url?: string;
  sizes?: string;
  className?: string;
};

export function IPhone({ src, alt = "", url, sizes = "220px", className = "" }: IPhoneProps) {
  const [top, bottom] = shotTones[src] ?? ["#000000", "#ffffff"];
  const statusInk = luminance(top) > 0.45 ? "#000" : "#fff";
  const lightBar = luminance(bottom) > 0.4;
  const host = url?.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  // The keys are positioned against the figure: keep it positioned, but let a
  // caller's absolute/fixed win (both utilities set `position`).
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";

  return (
    <figure className={`iphone ${pos} [container-type:inline-size] ${className}`} aria-hidden={alt ? undefined : true}>
      {/* side buttons: action + volume on the left, side button on the right */}
      <span className="iphone-key left-[-0.7cqw] top-[24cqw] h-[7cqw] rounded-l-[0.6cqw]" />
      <span className="iphone-key left-[-0.7cqw] top-[37cqw] h-[13cqw] rounded-l-[0.6cqw]" />
      <span className="iphone-key left-[-0.7cqw] top-[53cqw] h-[13cqw] rounded-l-[0.6cqw]" />
      <span className="iphone-key right-[-0.7cqw] top-[42cqw] h-[21cqw] rounded-r-[0.6cqw]" />

      <div className="iphone-band relative z-10 rounded-[15.2cqw] p-[1.4cqw]">
        <div className="rounded-[13.8cqw] bg-[#050506] p-[2.6cqw] shadow-[inset_0_0_0_0.3cqw_rgb(255_255_255/0.04)]">
          <div className="relative aspect-[393/852] overflow-hidden rounded-[11.2cqw]" style={{ background: top }}>
            {/* page, below the status bar */}
            <div className="absolute inset-x-0 bottom-0 top-[6.34%]">
              <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
            </div>

            {/* status bar: time in the left ear, icons in the right ear */}
            <div className="absolute inset-x-0 top-[1.29%] flex h-[4.34%] items-center justify-between px-[9.5%]" style={{ color: statusInk }}>
              <span className="w-[22%] text-center text-[3.95cqw] font-semibold tracking-[-0.01em] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif]">
                9:41
              </span>
              <StatusIcons color={statusInk} />
            </div>

            {/* Dynamic Island */}
            <span className="absolute left-1/2 top-[1.29%] h-[4.34%] w-[32%] -translate-x-1/2 rounded-full bg-black" />

            {/* Safari compact address bar */}
            {host ? (
              <div
                className="absolute inset-x-0 bottom-0 flex h-[10.4%] flex-col items-center pt-[1.1%] backdrop-blur-md"
                style={{ background: lightBar ? "rgb(246 246 248 / 0.86)" : "rgb(28 28 30 / 0.86)" }}
              >
                <div
                  className="flex h-[42%] w-[92%] items-center justify-center gap-[1.2cqw] rounded-[3cqw] px-[3cqw] text-[3.4cqw] [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif]"
                  style={{ background: lightBar ? "rgb(118 118 128 / 0.14)" : "rgb(118 118 128 / 0.3)", color: lightBar ? "#000" : "#fff" }}
                >
                  <svg viewBox="0 0 10 13" className="h-[2.6cqw] w-auto shrink-0 opacity-60" fill="currentColor" aria-hidden>
                    <path d="M5 0a3.3 3.3 0 0 0-3.3 3.3V5H1.2C.5 5 0 5.5 0 6.2v5.6C0 12.5.5 13 1.2 13h7.6c.7 0 1.2-.5 1.2-1.2V6.2C10 5.5 9.5 5 8.8 5h-.5V3.3A3.3 3.3 0 0 0 5 0Zm2 5H3V3.3a2 2 0 0 1 4 0V5Z" />
                  </svg>
                  <span className="truncate">{host}</span>
                </div>
              </div>
            ) : null}

            {/* home indicator */}
            <span
              className="absolute bottom-[0.94%] left-1/2 h-[0.59%] w-[34%] -translate-x-1/2 rounded-full"
              style={{ background: host ? (lightBar ? "#000" : "#fff") : luminance(bottom) > 0.4 ? "rgb(0 0 0 / 0.75)" : "rgb(255 255 255 / 0.8)" }}
            />

            {/* glass */}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/0.07)_0%,rgb(255_255_255/0)_34%)]" />
          </div>
        </div>
      </div>
    </figure>
  );
}
