import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'id.pinterest.com',
        port: '',
        pathname: '/pin/**',
      },
    ],
  },
};

export default nextConfig;