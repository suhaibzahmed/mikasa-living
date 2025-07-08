'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { VendorRegistrationData } from '@/schemas/vendor.schema'
import { cookies } from 'next/headers'

export const createNewVendor = async (
  data: VendorRegistrationData & { firebaseUid: string }
) => {
  try {
    if (!data.billingCycle) {
      throw new Error('Billing cycle is required')
    }
    if (!data.planId) {
      throw new Error('Plan is required')
    }
    const vendor = await prisma.vendor.create({
      data: {
        firebaseUid: data.firebaseUid,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        gstNumber: data.gstNumber,
        planId: data.planId,
        billingCycle: data.billingCycle,
      },
    })
    return { success: true, data: vendor }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}

export const verifyVendor = async (firebaseUid: string) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid,
      },
    })
    return { success: true, data: vendor }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}

export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
