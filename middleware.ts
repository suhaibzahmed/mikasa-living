// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge'
import { clientConfig, serverConfig } from './lib/firebase/config'

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
      console.log('pathname', pathname)

      if (AUTH_ROUTES.includes(pathname)) {
        return NextResponse.next()
      }

      if (pathname.startsWith('/admin')) {
        return redirectToLogin(request, {
          path: '/admin/sign-in',
          publicPaths: AUTH_ROUTES,
        })
      } else {
        return redirectToLogin(request, {
          path: '/vendor/sign-in',
          publicPaths: AUTH_ROUTES,
        })
      }
    },
    handleError: async (error) => {
      const { pathname } = request.nextUrl
      console.error('Unhandled authentication error:', { error })

      if (pathname.startsWith('/admin')) {
        return redirectToLogin(request, {
          path: '/admin/sign-in',
          publicPaths: AUTH_ROUTES,
        })
      } else {
        return redirectToLogin(request, {
          path: '/vendor/sign-in',
          publicPaths: AUTH_ROUTES,
        })
      }
    },
  })
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)', '/api/login', '/api/logout'],
}
