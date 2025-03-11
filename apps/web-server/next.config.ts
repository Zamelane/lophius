import type { NextConfig } from "next";

// Подключаем интернационализацию
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'files.zmln.ru',
        pathname: '/**',
        port: '',
        protocol: 'https',
        search: '',
      },
    ],
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default withNextIntl(nextConfig);