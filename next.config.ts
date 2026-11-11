import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Classic dynamic rendering: scholarship listings are read from
  // PostgreSQL on each request, so Cache Components is off.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
