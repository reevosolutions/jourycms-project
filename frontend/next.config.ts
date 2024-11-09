import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "miqat.com",
      },
      {
        protocol: "http",
        hostname: "miqat.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
