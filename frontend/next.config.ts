import type { NextConfig } from "next";

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_node_URL: process.env.NEXT_PUBLIC_node_URL,
  },
};

export default nextConfig;

