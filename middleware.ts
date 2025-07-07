import { NextRequest, NextResponse } from 'next/server'
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = request.cookies.get('session')?.value

  // If the user is trying to access an auth page, let them through.
  if (
    path.startsWith('/vendor/sign-in') ||
    path.startsWith('/vendor/sign-up') ||
    path.startsWith('/vendor/verify-otp')
  ) {
    return NextResponse.next()
  }

  // If there's no session, redirect to the sign-in page.
  if (!session) {
    return NextResponse.redirect(new URL('/vendor/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/vendor/:path*',
}
