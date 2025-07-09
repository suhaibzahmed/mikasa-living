'server only'

import { prisma } from '@/lib/db'
import { checkVendorAuth } from '../checkAuth'

export async function getVendorById() {
  try {
    const auth = await checkVendorAuth()
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
    })
    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorPhotos() {
  try {
    const auth = await checkVendorAuth()
    const photos = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
      select: {
        photos: true,
      },
    })
    return photos
  } catch (error) {
    console.log(error)
    return null
  }
}
