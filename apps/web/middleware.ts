import Negotiator from 'negotiator'
import {getCurrentUser} from "@/lib/dal";
import { match } from '@formatjs/intl-localematcher'
import { NextRequest, NextResponse } from 'next/server'

import { defaultLocale, localesSupported } from './i18n/config';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
//const publicRoutes = ['/login', '/signup', '/']
const apiProtectedRoutes = [''] // Роуты, которые требуют авторизацию
const staticRoutes = [
  '/fonts/',
  '/images/',
  '/api/',
  '/_next/',
  '/favicon.ico'
];
const staticNames = [
  'opengraph-image.png'
]

function getLocale(request: NextRequest) {
  const languages = new Negotiator({ 
    headers: Object.fromEntries(request.headers.entries())
   }).languages()
 
  return match(languages, localesSupported, defaultLocale) // -> 'en-US'
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Пропускаем статические файлы и favicon
  if (staticRoutes.some(prefix => path.startsWith(prefix)) || staticNames.some(suffix => path.includes(suffix)))
  {
    return NextResponse.next()
  }

  // Проверяем наличие локали в пути
  const { pathname } = req.nextUrl
  const pathnameHasLocale = ['ru', 'en'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Если локаль уже есть, продолжаем обработку запроса
  if (pathnameHasLocale) {
    // Здесь оставляем вашу существующую логику проверки защищенных роутов
    const isProtectedRoute = protectedRoutes.includes(path)
    const isApiProtectedRoute = apiProtectedRoutes.includes(path)
    const user = await getCurrentUser()

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);

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
  runtime: 'nodejs',
};