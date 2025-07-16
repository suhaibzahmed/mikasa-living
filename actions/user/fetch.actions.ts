'server only'

import { prisma } from '@/lib/db'

export async function getVendors() {
  try {
  } catch (error) {
    console.log('failed to get vendors', error)
  }
}

export async function getVendorById(id: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
        reviews: true,
      },
    })

    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}
