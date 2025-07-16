'server only'

import { prisma } from '@/lib/db'

export async function getVendors() {
  try {
  } catch (error) {
    console.log('failed to get vendors', error)
  }
}

export async function getFeaturedVendors() {
  try {
    const featuredVendors = await prisma.vendor.findMany({
      where: {
        AND: [{ isFeatured: true }, { verificationStatus: 'VERIFIED' }],
      },
      take: 5,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        plan: true,
        reviews: true,
      },
    })
    return { success: true, data: featuredVendors }
  } catch (error) {
    console.log('🚀 ~ getFeaturedVendors ~ error:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
