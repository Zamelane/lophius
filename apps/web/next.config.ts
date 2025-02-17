import type { NextConfig } from 'next';
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;