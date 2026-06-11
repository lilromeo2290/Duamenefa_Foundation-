import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    '.space-z.ai',
    'preview-chat-e60fd36d-91d2-49a8-a462-1842bd19cbcf.space-z.ai',
  ],
};

export default nextConfig;
