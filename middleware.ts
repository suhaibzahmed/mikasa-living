import { NextRequest, NextResponse } from 'next/server'
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = request.cookies.get('session')?.value

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

  return NextResponse.next()
}

export const config = {
  matcher: '/vendor/:path*',
}
