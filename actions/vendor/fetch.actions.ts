'server only'

import { prisma } from '@/lib/db'
import { checkVendorAuth } from '../checkAuth'

export async function getCompleteVendorDetails() {
  try {
    const auth = await checkVendorAuth()
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
      include: {
        plan: true,
        photos: true,
      },
    })
    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}
