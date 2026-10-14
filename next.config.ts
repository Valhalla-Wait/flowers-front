import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    "FAVORITES_ENABLED": "false",
    "NEXT_PUBLIC_SIMPLIFIED_ORDER_FLOW": "true"
  }
};

export default nextConfig;
