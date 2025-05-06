import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: '/manifest/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/manifest/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
