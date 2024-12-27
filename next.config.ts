import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/expenses",
        permanent: true, // Set to false if this is a temporary redirect
      },
    ];
  },
};

export default nextConfig;
