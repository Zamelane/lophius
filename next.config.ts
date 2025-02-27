import type { NextConfig } from "next";

// Подключаем интернационализацию
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    nodeMiddleware: true,
  },
};

export default withNextIntl(nextConfig);