import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const middleware = (request: NextRequestWithAuth) => {
  const isAuthenticated = request.nextauth.token
  const isUserAdmin = request.nextauth.token?.admin

  const isRouterUnauthenticated =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  const isRouterAdmin = request.nextUrl.pathname.startsWith('/admin/users')

  if (isRouterAdmin && !isUserAdmin) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (isAuthenticated && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (isAuthenticated && isRouterUnauthenticated) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}

const callbackOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware, callbackOptions)

export const config = {
  matcher: ['/((?!login|register|api/create/user|google.svg|man.jpeg).*)'],
}
