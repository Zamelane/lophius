import { getCurrentUser } from '@/lib/dal'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'

import { defaultLocale, localesSupported } from './i18n/config'
import { getIsConfigured } from './lib/config'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
//const publicRoutes = ['/login', '/signup', '/']
const apiProtectedRoutes = [''] // Роуты, которые требуют авторизацию
const staticRoutes = [
  '/fonts/',
  '/images/',
  '/manifest/',
  '/api/',
  '/_next/',
  '/favicon.ico',
  '/manifest.webmanifest',
  '/sitemap.xml'
]
const staticNames = ['opengraph-image.png']

function getLocale(request: NextRequest) {
  const languages = new Negotiator({
    headers: Object.fromEntries(request.headers.entries())
  }).languages()

  return match(languages, localesSupported, defaultLocale) // -> 'en-US'
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Пропускаем статические файлы и favicon
  if (
    staticRoutes.some((prefix) => pathname.startsWith(prefix)) ||
    staticNames.some((suffix) => pathname.includes(suffix))
  ) {
    return NextResponse.next()
  }

  const isConfigured = getIsConfigured()
  if (!isConfigured && !pathname.startsWith('/configuration')) {
    const pathSegments = pathname.split('/')
    if (pathSegments.length <= 2 || pathSegments[2] !== 'configuration') {
      return NextResponse.redirect(new URL('/configuration', req.url))
    }
  }

  // Проверяем наличие локали в пути
  const pathnameHasLocale = localesSupported.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Если локаль уже есть, продолжаем обработку запроса
  if (pathnameHasLocale) {
    // Здесь логика проверки защищенных роутов
    const isProtectedRoute = protectedRoutes.includes(pathname)
    const isApiProtectedRoute = apiProtectedRoutes.includes(pathname)
    const user = await getCurrentUser()

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-url', req.url)

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL('/login', req.nextUrl.basePath))
    }

    if (
      isApiProtectedRoute &&
      !user &&
      req.nextUrl.pathname.startsWith('/api')
    ) {
      return Response.json(
        { success: false, message: 'authentication failed' },
        { status: 401 }
      )
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

  // Если локали нет, перенаправляем с добавлением локали
  const locale = getLocale(req)
  req.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(req.nextUrl)
}

export const config = {
  runtime: 'nodejs'
}
