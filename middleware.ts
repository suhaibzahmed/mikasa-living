// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from 'next-firebase-auth-edge'
import { clientConfig, serverConfig } from './lib/firebase/config'

// Public routes that do not require authentication
const PUBLIC_PATHS = ['/', '/vendors', '/services']

// Authentication-related routes
const AUTH_ROUTES = [
  '/admin/sign-in',
  '/admin/sign-up',
  '/vendor/sign-in',
  '/vendor/sign-up',
  '/user/sign-in',
  '/user/sign-up',
]

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,

    handleValidToken: async ({ token, decodedToken }, headers) => {
      // console.log('DECODED TOKEN MIDDLEWARE:', decodedToken)
      const { role } = decodedToken
      const { pathname } = request.nextUrl

      // Redirect logged-in users from auth pages to their dashboards
      if (AUTH_ROUTES.includes(pathname)) {
        if (role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
        if (role === 'VENDOR') {
          return NextResponse.redirect(
            new URL('/vendor/dashboard', request.url)
          )
        }
        if (role === 'USER') {
          return NextResponse.redirect(new URL('/', request.url))
        }
      }

      // Redirect logged-in admins or vendors from public pages to their dashboards
      if (
        (role === 'ADMIN' || role === 'VENDOR') &&
        PUBLIC_PATHS.includes(pathname)
      ) {
        if (role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
        if (role === 'VENDOR') {
          return NextResponse.redirect(
            new URL('/vendor/dashboard', request.url)
          )
        }
      }

      // Prevent users from accessing routes of other roles
      if (role === 'ADMIN' && pathname.startsWith('/vendor')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      if (role === 'VENDOR' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/vendor/dashboard', request.url))
      }
      if (
        role === 'USER' &&
        (pathname.startsWith('/admin') || pathname.startsWith('/vendor'))
      ) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },

    handleInvalidToken: async () => {
      const { pathname } = request.nextUrl
      const allPublicRoutes = [...PUBLIC_PATHS, ...AUTH_ROUTES]

      // Allow access to all public and auth routes
      if (allPublicRoutes.includes(pathname)) {
        return NextResponse.next()
      }

      // Redirect to the appropriate login page for protected routes
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/sign-in', request.url))
      }
      if (pathname.startsWith('/vendor')) {
        return NextResponse.redirect(new URL('/vendor/sign-in', request.url))
      }

      return NextResponse.next()
    },

    handleError: async (error) => {
      const { pathname } = request.nextUrl
      console.error('Unhandled authentication error:', { error })
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/sign-in', request.url))
      } else if (pathname.startsWith('/vendor')) {
        return NextResponse.redirect(new URL('/vendor/sign-in', request.url))
      }
      return NextResponse.redirect(new URL('/user/sign-in', request.url))
    },
  })
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)', '/api/login', '/api/logout'],
}
