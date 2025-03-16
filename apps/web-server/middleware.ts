import {getCurrentUser} from "@/lib/dal";
import { NextRequest, NextResponse } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
//const publicRoutes = ['/login', '/signup', '/']
const apiProtectedRoutes = [''] // Роуты, которые требуют авторизацию

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (path.startsWith('/_next/static/') || path.startsWith('/favicon.ico'))
    return NextResponse.next()

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
  )
  {
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

export const config = {
  runtime: 'nodejs',
};