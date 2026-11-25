// Prints the /cv page to public/cv-pedro-tortoriello-en.pdf with headless Chrome.
//   node scripts/cv-pdf.mjs [url]
// The url defaults to the local dev server; pass the deployed /cv to get the case-study
// and portfolio links (a local server has no public address to print). CHROME_PATH overrides
// the browser. The page sets A4 and its margins (@page), so Chrome only needs the flags below.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2] ?? "http://localhost:3311/cv";
const out = resolve("public/cv-pedro-tortoriello-en.pdf");
// a throwaway profile, so a running Chrome is never touched
const profileDir = mkdtempSync(join(tmpdir(), "cv-pdf-"));

try {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--user-data-dir=${profileDir}`,
    "--no-pdf-header-footer",
    `--print-to-pdf=${out}`,
    url,
  ]);
} finally {
  rmSync(profileDir, { recursive: true, force: true });
}

console.log(`${out} (${Math.round(statSync(out).size / 1024)} KB) from ${url}`);
