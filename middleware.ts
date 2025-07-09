import { NextRequest, NextResponse } from 'next/server'
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = request.cookies.get('session')?.value

  const isAdminPath = path.startsWith('/admin')
  const isVendorPath = path.startsWith('/vendor')

  // Handle Admin routes
  if (isAdminPath) {
    const isAdminAuthPage = path.startsWith('/admin/sign-in')
    if (session && isAdminAuthPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    if (!session && !isAdminAuthPage) {
      return NextResponse.redirect(new URL('/admin/sign-in', request.url))
    }
  }

  // Handle Vendor routes
  if (isVendorPath) {
    const isVendorAuthPage =
      path.startsWith('/vendor/sign-in') ||
      path.startsWith('/vendor/sign-up') ||
      path.startsWith('/vendor/verify-otp')

    if (session && isVendorAuthPage) {
      return NextResponse.redirect(new URL('/vendor/dashboard', request.url))
    }

    if (!session && !isVendorAuthPage) {
      return NextResponse.redirect(new URL('/vendor/sign-in', request.url))
    }
  }

  const isUserAuthPage =
    path.startsWith('/user/sign-in') ||
    path.startsWith('/user/sign-up') ||
    path.startsWith('/user/verify-otp')

  if (session && isUserAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/:path*',
    '/user/sign-in',
    '/user/sign-up',
    '/user/verify-otp',
  ],
}
