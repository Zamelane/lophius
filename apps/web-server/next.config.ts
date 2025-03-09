import type { NextConfig } from "next";

// Подключаем интернационализацию
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    nodeMiddleware: true,
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default withNextIntl(nextConfig);