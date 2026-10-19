import type { NextConfig } from "next";
import { execSync } from "node:child_process";

// The commit shown in the hero: Vercel's deployed commit, else the local HEAD.
function commit() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "local";
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  env: { NEXT_PUBLIC_COMMIT: commit() },
};

export default nextConfig;
