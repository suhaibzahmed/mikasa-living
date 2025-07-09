'use server'

import { cookies } from 'next/headers'
import { authAdmin } from '@/lib/firebase-admin'

export const createSession = async ({
  idToken,
  role,
}: {
  idToken: string
  role: 'user' | 'vendor' | 'admin'
}) => {
  try {
    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    })

    const cookieStore = await cookies()
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    })
    cookieStore.set('role', role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
