// Подключаем интернационализацию
import path from 'node:path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { withTypedEnv } from 'next-typed-env'
import { z } from 'zod'
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
    nodeMiddleware: true,
    imgOptTimeoutInSeconds: 60
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    minimumCacheTTL: 2592000,
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
  enabled: process.env.ANALYZE === 'true'
})

const envSchema = z.object({
  SESSION_SECRET: z.string().default('your_secret_key'),
  MAX_FILE_SIZE: z.coerce
    .number()
    .min(0)
    .max(1_073_741_824) // 1 GB
    .default(7_340_032), // 7 MB
  PUBLIC_URL: z.string().default('http://localhost:3000'),
  DEBUG_LEVEL: z.coerce.number().min(1).max(4).default(4),

  // Прочие конфиги
  CONFIGURED: z.coerce.boolean().default(false),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().min(0).max(65_535),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string()
})

export default withBundleAnalyzer(
  withNextIntl(withTypedEnv(nextConfig, envSchema))
)
