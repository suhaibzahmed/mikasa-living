'server only'

import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { VENDOR_PAGE_SIZE } from '@/constants/config'

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
        vendor: { include: { plan: true, reviews: true, services: true } },
      },
    })

    return featuredVendors
  } catch (error) {
    console.log('🚀 ~ getFeaturedVendors ~ error:', error)
    throw error
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
      if (service) {
        where.services = {
          some: {
            service: {
              slug: service,
            },
          },
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
        featured: true,
        availability: true,
      },
    })
    // console.log('🚀 ~ vendors:', vendors)

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

export async function getVendorProfileDetails(id: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
        photos: true,
        videos: true,
        threeDimensional: true,
        availability: true,
        reviews: { include: { user: true }, orderBy: { createdAt: 'desc' } },
        services: {
          include: {
            service: true,
          },
        },
      },
    })
    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorAbout(id: string) {
  try {
    const vendorAbout = await prisma.vendor.findUnique({
      where: {
        id,
      },
      select: {
        description: true,
      },
    })
    return vendorAbout
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorPortfolio(id: string) {
  try {
    const vendorPortfolio = await prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
        videos: true,
      },
    })
    return vendorPortfolio
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorServices(id: string) {
  try {
    const vendorServices = await prisma.vendor.findUnique({
      where: {
        id,
      },
      select: {
        services: true,
      },
    })
    return vendorServices
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorReviews(id: string) {
  try {
    const vendorReviews = await prisma.review.findMany({
      where: {
        vendorId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    })
    return vendorReviews
  } catch (error) {
    console.log(error)
    return null
  }
}
