'use server'

import { prisma } from '@/lib/db'
import { VendorRegistrationData } from '@/schemas/vendor.schema'
import { cookies } from 'next/headers'
import { authAdmin } from '@/lib/firebase-admin'
import { checkVendorAuth } from '../checkAuth'

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

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany({ orderBy: { monthly: 'asc' } })
    return { success: true, data: plans }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const getPlanById = async (id: string) => {
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id,
      },
    })
    return { success: true, data: plan }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function getVendorDetails() {
  try {
    const session = await checkVendorAuth()

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: session.uid,
      },
    })

    if (!vendor) {
      return { success: false, message: 'Vendor not found' }
    }

    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
