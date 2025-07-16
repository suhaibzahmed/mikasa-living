'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { authAdmin } from '@/lib/firebase-admin'
import { verifySession } from '@/lib/session'
import { cookies } from 'next/headers'
import { checkAdminAuth } from '../checkAuth'
import { revalidatePath } from 'next/cache'

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

export const rejectVendor = async (vendorId: string) => {
  try {
    await checkAdminAuth()
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    })

    if (!vendor) {
      return { success: false, message: 'Vendor not found' }
    }

    await prisma.vendor.update({
      where: {
        id: vendor.id,
      },
      data: {
        verificationStatus: 'REJECTED',
      },
    })

    revalidatePath('/admin/vendor-management/*')
    return { success: true, message: 'Vendor rejected successfully' }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const approveVendor = async (vendorId: string) => {
  try {
    await checkAdminAuth()
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    })

    if (!vendor) {
      return { success: false, message: 'Vendor not found' }
    }

    await prisma.vendor.update({
      where: {
        id: vendor.id,
      },
      data: {
        verificationStatus: 'VERIFIED',
      },
    })

    revalidatePath('/admin/vendor-management/*')
    return { success: true, message: 'Vendor approved successfully' }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function createFeaturedVendors(vendorId: string[]) {
  try {
    await checkAdminAuth()

    await prisma.featured.createMany({
      data: vendorId.map((id) => ({
        vendorId: id,
      })),
    })

    return { success: true, message: 'Featured vendors created successfully' }
  } catch (error) {
    console.log('🚀 ~ createFeaturedVendors ~ error:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
