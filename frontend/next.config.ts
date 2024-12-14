import type {NextConfig} from "next";
import withSerwistInit from "@serwist/next";
import path from "node:path";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
});

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
        protocol: "https",
        hostname: "miqat.assil.dev",
      },
      {
        protocol: "https",
        hostname: "assil.dev",
      },
      {
        protocol: "https",
        hostname: "miqat-api.assil.dev",
      },
      {
        protocol: "https",
        hostname: "*.assil.dev",
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

  async headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            // This doesn't work for 'Cache-Control' key (works for others though):
            source: "/_next/(.*)",
            headers: [
              {
                key: "Cache-Control",
                // Instead of this value:
                value:
                  "public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800",
                // Cache-Control response header is `public, max-age=60` in production
                // and `public, max-age=0, must-revalidate` in development
              },
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
            ],
          },
        ]
      : [];
  },
  
};

export default nextConfig;
// export default withSerwist(nextConfig);
