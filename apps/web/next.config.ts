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
  outputFileTracingRoot: path.join(__dirname, '../../'),
  experimental: {
    //ppr: true,
    useCache: true,
    nodeMiddleware: true
  },
  images: {
    remotePatterns: [
      {
        port: '',
        search: '',
        pathname: '/**',
        protocol: 'https',
        hostname: 'files.zmln.ru',
      },
      {
        hostname: 'image.tmdb.org'
      },
      {
        hostname: 'www.themoviedb.org'
      },
      {
        hostname: 'media.themoviedb.org'
      }
    ],
  }
};

export default withNextIntl(nextConfig);