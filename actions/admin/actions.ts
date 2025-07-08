'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { authAdmin } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'

export const verifyAdminAndCreateSession = async (idToken: string) => {
  try {
    const decodedToken = await authAdmin.verifyIdToken(idToken)
    console.log(
      '🚀 ~ verifyAdminAndCreateSession ~ decodedToken:',
      decodedToken
    )
    const { uid, email } = decodedToken

    if (!email) {
      throw new Error('Email not found in token')
    }

    let admin = await prisma.admin.findUnique({
      where: { firebaseUid: uid },
    })

    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          firebaseUid: uid,
          email,
        },
      })
    }

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

    return { success: true, data: admin }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}
