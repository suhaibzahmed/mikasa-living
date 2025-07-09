'server only'

import { prisma } from '@/lib/db'
import { USER_PAGE_SIZE, VENDOR_PAGE_SIZE } from '@/constants/config'
import { PlanType, Prisma, VerificationStatus } from '@prisma/client'
import { checkAdminAuth } from '../checkAuth'

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
    if (!vendor) {
      return { success: false, message: 'Vendor not found', data: null }
    }
    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
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

export async function getUsers(params: { page?: number; user?: string }) {
  const { page = 1, user } = params
  const pageSize = USER_PAGE_SIZE
  try {
    await checkAdminAuth()

    const where: Prisma.UserWhereInput = {}

    if (user) {
      where.name = { contains: user, mode: 'insensitive' }
    }

    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalUsers = await prisma.user.count({ where })

    return {
      success: true,
      data: {
        users,
        totalPages: Math.ceil(totalUsers / pageSize),
        totalUsers,
      },
    }
  } catch (error) {
    console.log('🚀 ~ getPendingVendors ~ error:', error)
    return {
      success: false,
      message: 'Failed to get users',
      data: { users: [], totalPages: 0 },
    }
  }
}

export async function getUserById(id: string) {
  try {
    await checkAdminAuth()

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return { success: false, message: 'User not found', data: null }
    }

    return { success: true, data: user }
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
