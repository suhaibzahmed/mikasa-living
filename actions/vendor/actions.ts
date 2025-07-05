'use server'

import { prisma } from '@/lib/db'
import {
  vendorRegistrationSchema,
  VendorRegistrationData,
} from '@/schemas/vendor.schema'

export const createNewVendor = async (data: VendorRegistrationData) => {
  const validationResult = vendorRegistrationSchema.safeParse(data)

  if (!validationResult.success) {
    return { success: false, message: 'Invalid data' }
  }

  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id: validationResult.data.planId,
      },
    })

    if (!plan) {
      return { success: false, message: 'Plan not found' }
    }

    if (!validationResult.data.billingCycle) {
      return { success: false, message: 'Billing cycle not found' }
    }

    const newVendor = await prisma.vendor.create({
      data: {
        companyName: validationResult.data.companyName,
        gstNumber: validationResult.data.gstNumber,
        phone: validationResult.data.phone,
        email: validationResult.data.email,
        plan: {
          connect: {
            id: plan.id,
          },
        },
        billingCycle: validationResult.data.billingCycle,
      },
    })
    console.log('🚀 ~ createNewVendor ~ newVendor:', newVendor)
    return { success: true, message: 'Registered successfully!' }
  } catch (error) {
    console.error('Error creating new vendor:', error)
    return { success: false, message: 'Failed to create new vendor.' }
  }
}
