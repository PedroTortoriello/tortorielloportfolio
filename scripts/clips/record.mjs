// Records the short looping clips that the work cards and case heroes play (lib/videos.ts).
// Headless Chrome over the DevTools Protocol opens each case's public URL (no login, nothing typed),
// lets it settle, then scrolls it down and back up (so the clip loops without a cut) while it takes
// one screenshot per frame on virtual time: the page's own animations keep their real speed however
// slow the capture is. ffmpeg encodes WebM (VP9) + MP4 (H.264), no audio, and takes the first frame
// as the poster, all into public/work/clips/. A page that shows only a login form gets no clip, unless
// the product offers a guest mode that needs no account (GUEST below): then one click enters it and the
// clip tours a few screens instead of scrolling. Nothing is ever typed.
//
//   FFMPEG=path/to/ffmpeg.exe node scripts/clips/record.mjs [slug ...]
//
// A dev tool, not part of the build. CHROME overrides the browser path. About 4 minutes per clip.
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../../lib/projects.ts";

const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FFMPEG = process.env.FFMPEG ?? "ffmpeg";
const OUT = "public/work/clips";
const W = 1280;
const H = 800;
const FPS = 30;
const SECONDS = 12;
const MAX_BYTES = 1.5 * 1024 * 1024;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Products whose public URL opens on a sign-in screen but offer a guest mode with local data
// (Pedro approved recording it). Each tour step is [label to click, ms from the start]; the tour
// ends on the screen it starts on, so the clip loops without a cut.
const GUEST = {
  "finance-platform": {
    enter: "Usar sem conta (dados locais)",
    tour: [
      ["Futuro", 3000],
      ["Planner", 6400],
      ["Calendário", 6800],
      ["Hoje", 10000],
    ],
  },
};

// Clicks a control by its exact text (the app renders its navigation as plain clickable divs).
const CLICK = `(label) => {
  const el = [...document.querySelectorAll("div, button, a")].find((d) => d.textContent.trim() === label && d.children.length <= 2);
  el?.click();
  return !!el;
}`;

const tour = (steps) => `(async () => {
  const click = ${CLICK};
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let t = 0;
  for (const [label, at] of ${JSON.stringify(steps)}) {
    await wait(at - t);
    t = at;
    click(label);
  }
})()`;

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("error", reject);
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`))));
  });

// A minimal CDP client: send() resolves with the result, on() subscribes to an event and returns its off().
async function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const handlers = new Map();
  let id = 0;
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id) {
      const p = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) p.reject(new Error(m.error.message));
      else p.resolve(m.result);
    } else for (const f of handlers.get(m.method) ?? []) f(m.params);
  };
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  return {
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        pending.set(++id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      }),
    on: (method, f) => {
      handlers.set(method, [...(handlers.get(method) ?? []), f]);
      return () =>
        handlers.set(
          method,
          (handlers.get(method) ?? []).filter((g) => g !== f),
        );
    },
    close: () => ws.close(),
  };
}

// A fresh browser per clip: virtual time cannot be switched off again once a page uses it. Port 0 lets
// Chrome pick a free debugging port (written to DevToolsActivePort), so a closing browser never blocks the next.
async function launch() {
  const profile = await mkdtemp(join(tmpdir(), "clip-chrome-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      `--window-size=${W},${H}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--mute-audio",
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  const quit = async () => {
    chrome.kill();
    await sleep(800);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };
  for (let i = 0; i < 150; i++) {
    try {
      const [port] = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split(/\s+/);
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return { cdp: await connect(page.webSocketDebuggerUrl), quit };
    } catch {
      /* not up yet */
    }
    await sleep(200);
  }
  await quit();
  throw new Error("Chrome did not start");
}

const evaluate = async (cdp, expression) =>
  (await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

// Down about two and a half screens and back up, eased, with holds at the top and at the turn: 12 s.
const CHOREOGRAPHY = `(async () => {
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const tween = (from, to, ms) => new Promise((done) => {
    const t0 = performance.now();
    // performance.now(), not the rAF timestamp: only the former runs on virtual time
    const step = () => {
      const p = Math.min(1, (performance.now() - t0) / ms);
      scrollTo({ top: from + (to - from) * ease(p), behavior: "instant" });
      p < 1 ? requestAnimationFrame(step) : done();
    };
    requestAnimationFrame(step);
  });
  const end = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.6);
  await wait(1000);
  await tween(0, end, 5000);
  await wait(800);
  await tween(end, 0, 5000);
})()`;

async function record(cdp, slug, url) {
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  let off = () => {};
  const loaded = new Promise((r) => (off = cdp.on("Page.loadEventFired", r)));
  await cdp.send("Page.navigate", { url });
  await Promise.race([loaded, sleep(20000)]);
  off();
  await sleep(3000);

  const guest = GUEST[slug];
  if (guest) {
    // one click on the product's own "use without an account" control; nothing typed
    if (!(await evaluate(cdp, `(${CLICK})(${JSON.stringify(guest.enter)})`))) return `skipped: no "${guest.enter}" control`;
    await sleep(3000);
  }

  const page = await evaluate(
    cdp,
    `({ url: location.href, height: document.documentElement.scrollHeight, login: !!document.querySelector('input[type="password"]') })`,
  );
  // Truth rule: only what the public URL shows. A sign-in wall is not the product.
  if (!guest && page.login && page.height < H * 1.5) return `skipped: ${page.url} shows only a login screen`;
  if (!guest && page.height < H * 1.5) return `skipped: ${page.url} is a single screen (${page.height}px), nothing to scroll`;
  if (guest && page.login) return `skipped: ${page.url} still shows a login form after the guest click`;

  // Virtual time: the page (timers, rAF, CSS animations, the scroll above) only moves when a budget
  // is granted. Each frame grants 1/FPS s; the screenshot is taken while the last slice runs, which
  // lets Chrome produce the frame without waiting out its idle timeout.
  const dir = await mkdtemp(join(tmpdir(), "clip-"));
  try {
    let expired = () => {};
    cdp.on("Emulation.virtualTimeBudgetExpired", () => expired());
    const advance = (ms) =>
      new Promise((r) => {
        expired = r;
        cdp.send("Emulation.setVirtualTimePolicy", { policy: "advance", budget: ms });
      });
    await cdp.send("Emulation.setVirtualTimePolicy", { policy: "pause" });
    cdp.send("Runtime.evaluate", { expression: guest ? tour(guest.tour) : CHOREOGRAPHY });
    const slice = 1000 / FPS / 4;
    for (let i = 0; i < FPS * SECONDS; i++) {
      await advance(slice * 3);
      const shot = cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 92, optimizeForSpeed: true });
      await advance(slice);
      await writeFile(join(dir, `f${String(i).padStart(4, "0")}.jpg`), Buffer.from((await shot).data, "base64"));
    }

    const input = ["-y", "-framerate", String(FPS), "-i", join(dir, "f%04d.jpg")];
    // JPEG frames are full-range BT.601; Chrome refuses to decode full-range VP9, so convert to video range BT.709.
    const vf = [
      "-vf",
      `scale=${W}:-2:flags=lanczos:in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p`,
      ...["-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-an"],
    ];
    const base = join(OUT, slug);
    // Raise the quantiser until each file fits the budget.
    for (const [ext, codec, from] of [
      [
        "mp4",
        (crf) => [
          "-c:v",
          "libx264",
          "-preset",
          "veryslow",
          "-crf",
          crf,
          "-profile:v",
          "high",
          "-level:v",
          "4.0",
          "-movflags",
          "+faststart",
        ],
        26,
      ],
      ["webm", (crf) => ["-c:v", "libvpx-vp9", "-crf", crf, "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "1"], 36],
    ]) {
      for (let crf = from; ; crf += 3) {
        await run(FFMPEG, [...input, ...vf, ...codec(String(crf)), `${base}.${ext}`]);
        const { size } = await stat(`${base}.${ext}`);
        if (size <= MAX_BYTES || crf >= from + 18) {
          console.log(`  ${slug}.${ext}  crf ${crf}  ${(size / 1024).toFixed(0)} KB`);
          break;
        }
      }
    }
    await run(FFMPEG, ["-y", "-i", `${base}.mp4`, "-frames:v", "1", "-c:v", "libwebp", "-quality", "82", `${base}.webp`]);
    return `recorded ${FPS * SECONDS} frames of ${page.url}`;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const only = process.argv.slice(2);
for (const p of projects) {
  const url = p.links[0]?.href;
  if (!url || (only.length && !only.includes(p.slug))) continue;
  console.log(`${p.slug}: ${url}`);
  const { cdp, quit } = await launch();
  try {
    console.log(`  ${await record(cdp, p.slug, url)}`);
  } finally {
    cdp.close();
    await quit();
  }
}
process.exit(0);
