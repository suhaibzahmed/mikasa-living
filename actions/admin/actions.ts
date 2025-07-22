'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getAuthenticatedUser } from '../checkAuth'

export async function createAdmin(firebaseUid: string, email: string) {
  try {
    await prisma.admin.create({
      data: {
        email,
        firebaseUid,
      },
    })

    return { success: true, message: 'Logged in successfully' }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const rejectVendor = async (vendorId: string) => {
  try {
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
    await getAuthenticatedUser()

    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    })

    if (!vendor) {
      throw new Error('Vendor not found')
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

export async function updateFeaturedVendors(vendorIds: string[]) {
  try {
    // First, delete all existing featured vendors
    await prisma.featured.deleteMany({})

    // Then, create new featured vendors from the provided list
    if (vendorIds.length > 0) {
      await prisma.featured.createMany({
        data: vendorIds.map((id) => ({
          vendorId: id,
        })),
      })
    }

    revalidatePath('/admin/ad-management/*')
    return { success: true, message: 'Featured vendors updated successfully' }
  } catch (error) {
    console.log('🚀 ~ updateFeaturedVendors ~ error:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
