import type { NextConfig } from "next";

// In the Base44 sandbox the preview is served through a public proxy host, so
// Next.js sees a browser origin it does not know. Extend its allowlists only
// when the sandbox preview flag is set, using the host values passed in by
// Compose. `allowedDevOrigins` covers dev assets/HMR, `serverActions` covers
// forwarded form actions (login/signup).
const previewMode = process.env.BASE44_PREVIEW_MODE === "1";
const previewHost = process.env.BASE44_PUBLIC_HOST_SUFFIX
  ? `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`
  : null;
const previewOrigins = previewMode
  ? [
      previewHost,
      process.env.BASE44_SANDBOX_HOST_DOMAIN
        ? `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`
        : null,
    ].filter((origin): origin is string => Boolean(origin))
  : [];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(previewOrigins.length > 0 ? { allowedDevOrigins: previewOrigins } : {}),
  ...(previewMode && previewHost
    ? { experimental: { serverActions: { allowedOrigins: [previewHost] } } }
    : {}),
};

export default nextConfig;
