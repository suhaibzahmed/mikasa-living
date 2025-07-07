import { authAdmin } from '@/lib/firebase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { idToken } = await request.json()

  if (!idToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 })
  }

  try {
    await authAdmin.verifyIdToken(idToken)
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn,
    })

    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    }

    const response = NextResponse.json({ status: 'success' })
    response.cookies.set('session', sessionCookie, options)
    return response
  } catch (error) {
    console.error('Error verifying token or creating session cookie', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
