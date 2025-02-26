import {getUser} from "@/lib/dal";
import { cookies } from 'next/headers'
import { decrypt } from "@/lib/session";
import { NextRequest, NextResponse } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
//const publicRoutes = ['/login', '/signup', '/']
const apiPublicRoutes = ['/', '/login', '/signin']

export async function middleware(req: NextRequest) {
  console.log('fdsfsdf')
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
 // const isPublicRoute = publicRoutes.includes(path)
  const isApiPublicRoute = apiPublicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  // Это типа для дашборда проверяем все роуты, прежде чем пустить ???
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }

  if (
    !isApiPublicRoute &&
    req.nextUrl.pathname.startsWith('/api')
  ) {
    const user = await getUser()

    if (!user)
      return Response.json(
        { message: 'authentication failed', success: false },
        { status: 401 }
      )
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }

export const config = {
  matcher: ['/']
}