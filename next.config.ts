import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["noonchi-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },


};

export default nextConfig;
