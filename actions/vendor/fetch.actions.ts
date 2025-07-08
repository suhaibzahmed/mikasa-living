'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { verifySession } from '@/lib/session'

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany()
    return { success: true, data: plans }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}

export async function getVendorDetails() {
  try {
    const session = await verifySession()
    if (!session) {
      return { success: false, message: 'Not authenticated' }
    }

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
    return { success: false, message: getErrorMessage(error) }
  }
}

export async function getVendors(params: {
  page?: number
  pageSize?: number
  sort?: string
  filter?: string
}) {
  const { page = 1, pageSize = 10, sort, filter } = params

  try {
    const vendors = await prisma.vendor.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: filter
        ? { companyName: { contains: filter, mode: 'insensitive' } }
        : {},
      orderBy: sort
        ? { [sort.split(':')[0]]: sort.split(':')[1] }
        : { createdAt: 'desc' },
      include: {
        plan: true,
      },
    })

    const totalVendors = await prisma.vendor.count({
      where: filter
        ? { companyName: { contains: filter, mode: 'insensitive' } }
        : {},
    })

    return {
      success: true,
      data: {
        vendors,
        pagination: {
          page,
          pageSize,
          total: totalVendors,
          totalPages: Math.ceil(totalVendors / pageSize),
        },
      },
    }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}
