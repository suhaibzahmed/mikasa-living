'server only'

import { prisma } from '@/lib/db'
import { handleError } from '@/lib/error'
import { Plan } from '@prisma/client'

export async function getPlans() {
  try {
    const plans: Plan[] = await prisma.plan.findMany()
    return { success: true, data: plans }
  } catch (error) {
    return handleError(error, 'getPlans')
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
    return handleError(error, 'getVendors')
  }
}
