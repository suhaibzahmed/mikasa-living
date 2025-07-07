'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import {
  vendorRegistrationSchema,
  VendorRegistrationData,
} from '@/schemas/vendor.schema'

export const createNewVendor = async (data: VendorRegistrationData) => {
  try {
    const validationResult = vendorRegistrationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new Error('Invalid data')
    }

    if (!validationResult.data.billingCycle) {
      throw new Error('Billing cycle is required.')
    }

    const newVendor = await prisma.vendor.create({
      data: {
        companyName: validationResult.data.companyName,
        gstNumber: validationResult.data.gstNumber,
        phone: validationResult.data.phone,
        email: validationResult.data.email,
        plan: {
          connect: {
            id: validationResult.data.planId,
          },
        },
        billingCycle: validationResult.data.billingCycle,
      },
    })
    return {
      success: true,
      data: newVendor,
      message: 'You are registered successfully!',
    }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}

export const verifyVendor = async (phone: string) => {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        phone,
      },
    })
    return { success: true, data: vendor }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}
