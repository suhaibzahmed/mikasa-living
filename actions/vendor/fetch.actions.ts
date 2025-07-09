'server only'

import { prisma } from '@/lib/db'
import { VENDOR_PAGE_SIZE } from '@/constants/config'
import { PlanType, Prisma, VerificationStatus } from '@prisma/client'
import { checkAdminAuth } from '../checkAuth'

export async function getVendors(params: {
  page?: number
  vendor?: string
  verificationStatus?: string
  plan?: string
}) {
  const { page = 1, vendor, verificationStatus, plan } = params
  const pageSize = VENDOR_PAGE_SIZE

  try {
    await checkAdminAuth()

    const where: Prisma.VendorWhereInput = {}

    if (vendor) {
      where.companyName = { contains: vendor, mode: 'insensitive' }
    }

    if (verificationStatus && verificationStatus !== 'all') {
      where.verificationStatus = verificationStatus as VerificationStatus
    }

    if (plan && plan !== 'all') {
      where.plan = {
        type: plan as PlanType,
      }
    }

    const vendors = await prisma.vendor.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      include: {
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalVendors = await prisma.vendor.count({ where })

    return {
      success: true,
      data: {
        vendors,
        totalPages: Math.ceil(totalVendors / pageSize),
        totalVendors,
      },
    }
  } catch (error) {
    console.log('🚀 ~ getVendors ~ error:', error)
    return {
      success: false,
      message: 'Failed to get vendors',
      data: { vendors: [], totalPages: 0 },
    }
  }
}

export async function getPendingVendors() {
  try {
    await checkAdminAuth()

    const pendingVendors = await prisma.vendor.findMany({
      where: {
        verificationStatus: 'PENDING',
      },
      take: 5,
      orderBy: {
        createdAt: 'asc',
      },
    })

    return { succes: true, data: pendingVendors }
  } catch (error) {
    console.log('🚀 ~ getPendingVendors ~ error:', error)
    return {
      success: false,
      message: 'Failed to get pending vendors',
      data: [],
    }
  }
}

export async function getVendorById(vendorId: string) {
  try {
    await checkAdminAuth()

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        plan: true,
      },
    })

    if (!vendor) {
      return { success: false, message: 'Vendor not found', data: null }
    }

    return { success: true, data: vendor }
  } catch (error) {
    console.error('Error getting vendor by ID:', error)
    return { success: false, message: 'Failed to get vendor', data: null }
  }
}
