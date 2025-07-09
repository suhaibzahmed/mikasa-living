'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { authAdmin } from '@/lib/firebase-admin'
import { verifySession } from '@/lib/session'
import { cookies } from 'next/headers'
import { checkAdminAuth } from '../checkAuth'

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

export const logout = async () => {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const getAdmin = async () => {
  try {
    const session = await verifySession()
    if (!session) {
      return null
    }

    const admin = await prisma.admin.findUnique({
      where: { firebaseUid: session.uid },
    })

    return admin
  } catch (error) {
    console.error('Failed to get admin', error)
    return null
  }
}

export async function getVendorById(id: string) {
  try {
    await checkAdminAuth()
    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
      },
    })
    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
