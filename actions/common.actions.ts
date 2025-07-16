'server only'

import { prisma } from '@/lib/db'

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
        updatedAt: 'desc',
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
