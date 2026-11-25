import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Route changes run as React view transitions: a work cover morphs into its case hero
  // (components/media/cover-morph.tsx). Browsers without the API just navigate.
  experimental: { viewTransition: true },
};

export default nextConfig;
