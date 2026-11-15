import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
    minimumCacheTTL: 3600,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
