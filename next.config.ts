import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "hallowed-raccoon-99.convex.cloud",
        protocol: "https",
        port: "",
      }
    ]
  }
};

export default nextConfig;
