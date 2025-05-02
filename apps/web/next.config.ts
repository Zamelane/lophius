// Подключаем интернационализацию
import path from 'node:path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

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

    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    
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
        hostname: 'files.zmln.ru'
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
    ]
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withNextIntl(nextConfig))