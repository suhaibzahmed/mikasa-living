'use server'

import { prisma } from '@/lib/db'
import {
  VendorRegistrationData,
  vendorSignInSchema,
} from '@/schemas/vendor.schema'
import { cookies } from 'next/headers'
import { authAdmin } from '@/lib/firebase-admin'

export const sendOTP = async (phone: string) => {
  try {
    const validatedData = vendorSignInSchema.parse({ phone })

    // TODO: Implement OTP sending using Firebase Admin
    console.log('Sending OTP to', validatedData.phone)

    return { success: true, message: 'OTP sent successfully' }
  } catch (error) {
    console.error('Failed to send OTP', error)
    return { success: false, message: 'Failed to send OTP. Please try again.' }
  }
}

export const verifyVendor = async (phone: string) => {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        phone,
      },
    })
    if (!vendor) {
      return { success: false, message: 'Vendor not found. Please sign up.' }
    }
    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
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

export const verifyOtp = async (idToken: string) => {
  try {
    const decodedToken = await authAdmin.verifyIdToken(idToken)
    return { success: true, data: decodedToken }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const createNewVendor = async (
  data: VendorRegistrationData & { firebaseUid: string }
) => {
  try {
    const vendor = await prisma.vendor.create({
      data,
    })
    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const createSession = async (idToken: string) => {
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

    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
