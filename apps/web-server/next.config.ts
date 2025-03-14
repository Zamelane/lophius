import type { NextConfig } from "next";

// Подключаем интернационализацию
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  /* config options here */
  experimental: {
    nodeMiddleware: true,
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
  images: {
    remotePatterns: [
      {
        port: '',
        search: '',
        pathname: '/**',
        protocol: 'https',
        hostname: 'files.zmln.ru',
      },
    ],
  }
};

export default withNextIntl(nextConfig);