'use server'

import { prisma } from '@/lib/db'
import { VendorRegistrationData } from '@/schemas/vendor.schema'
import { cookies } from 'next/headers'
import { authAdmin } from '@/lib/firebase-admin'
import { checkVendorAuth } from '../checkAuth'
import { createSession } from '../session'
import { revalidatePath } from 'next/cache'
import { updateVendorDetailsSchema } from '@/schemas/vendor.schema'
import { z } from 'zod'
import { deleteImageFile, uploadImageFile } from '@/lib/supabase'
import { imageSchema } from '@/schemas/vendor.schema'

export const verifyVendor = async (phone: string) => {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        phone,
      },
    })
    if (!vendor) {
      return { success: false, message: 'Vendor not found. Please sign up.' }
    }
    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const logout = async () => {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const verifyOtp = async (idToken: string) => {
  try {
    const decodedToken = await authAdmin.verifyIdToken(idToken)
    return { success: true, data: decodedToken }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const createVendorAndSession = async ({
  idToken,
  ...data
}: VendorRegistrationData & { firebaseUid: string; idToken: string }) => {
  try {
    const vendor = await prisma.vendor.create({
      data,
    })

    await createSession({ idToken, role: 'vendor' })

    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany({ orderBy: { monthly: 'asc' } })
    return { success: true, data: plans }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const getPlanById = async (id: string) => {
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id,
      },
    })
    return { success: true, data: plan }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

// FOR VENDOR SIDEBAR
export async function getVendorDetails() {
  try {
    const session = await checkVendorAuth()

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: session.uid,
      },
    })

    if (!vendor) {
      return { success: false, message: 'Vendor not found' }
    }

    return { success: true, data: vendor }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function updateVendorDetails(
  formData: z.infer<typeof updateVendorDetailsSchema>
) {
  try {
    const auth = await checkVendorAuth()
    const validatedData = updateVendorDetailsSchema.safeParse(formData)

    if (!validatedData.success) {
      throw new Error(validatedData.error.errors[0].message)
    }

    await prisma.vendor.update({
      where: {
        firebaseUid: auth.uid,
      },
      data: validatedData.data,
    })
    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Details updated successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

export async function uploadVendorPhoto(formData: FormData) {
  try {
    const auth = await checkVendorAuth()
    const image = formData.get('image') as File

    const validatedData = imageSchema.safeParse({ image })

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      }
    }

    const imageUrl = await uploadImageFile(validatedData.data.image)

    if (!imageUrl) {
      return {
        success: false,
        message: 'Failed to upload image. Please try again.',
      }
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
      include: {
        plan: true,
        photos: true,
      },
    })

    if (!vendor) {
      return {
        success: false,
        message: 'Vendor not found.',
      }
    }

    const photoLimit = vendor.plan.photoLimit
    const photosUploaded = vendor.photos.length

    if (photosUploaded >= photoLimit) {
      return {
        success: false,
        message: 'You have reached your photo upload limit.',
      }
    }

    await prisma.photo.create({
      data: {
        url: imageUrl,
        vendorId: vendor.id,
      },
    })

    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Image uploaded successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}
export async function deleteVendorPhoto(photoId: string) {
  try {
    const auth = await checkVendorAuth()

    const photo = await prisma.photo.findUnique({
      where: {
        id: photoId,
        vendor: {
          firebaseUid: auth.uid,
        },
      },
    })

    if (!photo) {
      return {
        success: false,
        message: 'Photo not found or you do not have permission to delete it.',
      }
    }

    const deleted = await deleteImageFile(photo.url)

    if (!deleted) {
      return {
        success: false,
        message: 'Failed to delete image from storage. Please try again.',
      }
    }

    await prisma.photo.delete({
      where: {
        id: photoId,
      },
    })

    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Image deleted successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}
