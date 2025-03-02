import {getUser} from "@/lib/dal";
import { NextRequest, NextResponse } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
//const publicRoutes = ['/login', '/signup', '/']
const apiPublicRoutes = ['/', '/login', '/signin']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isApiPublicRoute = apiPublicRoutes.includes(path)
  const user = await getUser()

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (
    !isApiPublicRoute &&
    !user &&
    req.nextUrl.pathname.startsWith('/api')
  )
  {
    return Response.json(
        { message: 'authentication failed', success: false },
        { status: 401 }
      )
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
};