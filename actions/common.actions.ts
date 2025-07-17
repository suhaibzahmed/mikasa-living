'server only'

import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { VENDOR_PAGE_SIZE } from '@/constants/config'
import { vendorServices } from '@/constants/user.constants'

export async function getFeaturedVendors() {
  try {
    const featuredVendors = await prisma.featured.findMany({
      where: {
        vendor: {
          verificationStatus: 'VERIFIED',
        },
      },
      take: 4,
      orderBy: {
        vendor: { plan: { monthly: 'desc' } },
      },
      include: {
        vendor: { include: { plan: true, reviews: true } },
      },
    })

    return { success: true, data: featuredVendors }
  } catch (error) {
    console.log('🚀 ~ getFeaturedVendors ~ error:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function getAllVendors({
  page = 1,
  sort,
  service,
}: {
  page?: number
  sort?: string
  service?: string
}) {
  const pageSize = VENDOR_PAGE_SIZE
  try {
    const where: Prisma.VendorWhereInput = {
      verificationStatus: 'VERIFIED',
    }
    let orderBy: Prisma.VendorOrderByWithRelationInput = {
      createdAt: 'desc',
    }

    if (service && service !== 'all') {
      const serviceObject = vendorServices.find((s) => s.slug === service)
      if (serviceObject) {
        where.services = {
          has: serviceObject.title,
        }
      }
    }

    if (sort && sort !== 'all') {
      if (sort === 'rating') {
        orderBy = {
          reviews: {
            _count: 'desc',
          },
        }
      } else if (sort === 'reviews') {
        orderBy = {
          reviews: {
            _count: 'desc',
          },
        }
      } else if (sort === 'tier') {
        orderBy = {
          plan: {
            monthly: 'desc',
          },
        }
      }
    }

    const vendors = await prisma.vendor.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        plan: true,
        reviews: true,
      },
    })
    console.log('🚀 ~ vendors:', vendors)

    const totalVendors = await prisma.vendor.count({ where })

    return {
      success: true,
      data: {
        vendors,
        totalPages: Math.ceil(totalVendors / pageSize),
      },
    }
  } catch (error) {
    console.log('🚀 ~ getAllVendors ~ error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
      data: { vendors: [], totalPages: 0 },
    }
  }
}
