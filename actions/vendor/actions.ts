'use server'

import { prisma } from '@/lib/db'
import {
  AvailabilityData,
  AvailabilitySchema,
  VendorRegistrationData,
  vendorRegistrationSchema,
  videoSchema,
} from '@/schemas/vendor.schema'
import { revalidatePath } from 'next/cache'
import { updateVendorDetailsSchema } from '@/schemas/vendor.schema'
import { z } from 'zod'
import {
  deleteImageFile,
  deleteVideoFile,
  uploadImageFile,
  uploadVideoFile,
} from '@/lib/supabase'
import { imageSchema } from '@/schemas/vendor.schema'
import { getAuthenticatedUser } from '../checkAuth'
import { setCustomClaims } from '@/lib/auth'

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

export const createVendor = async (
  vendorData: Partial<VendorRegistrationData>
) => {
  try {
    const validatedData = vendorRegistrationSchema.safeParse(vendorData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Invalid data provided.',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    const checkVendor = await getAuthenticatedUser()

    const existingVendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkVendor.uid,
      },
    })

    if (existingVendor) {
      await setCustomClaims(existingVendor.firebaseUid, 'VENDOR')
      return {
        success: false,
        message: 'Vendor already exists.',
      }
    }

    const vendor = await prisma.vendor.create({
      data: {
        firebaseUid: checkVendor.uid,
        ...validatedData.data,
      },
    })

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
    console.error('Error fetching plans:', error)
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
export async function getVendorSidebarDetails() {
  try {
    const checkAuth = await getAuthenticatedUser()
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
      select: {
        companyName: true,
        email: true,
      },
    })

    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updateVendorDetails(
  formData: z.infer<typeof updateVendorDetailsSchema>
) {
  try {
    const auth = await getAuthenticatedUser()
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
    const auth = await getAuthenticatedUser()
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
    const auth = await getAuthenticatedUser()

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

export async function uploadVendorVideo(formData: FormData) {
  try {
    const auth = await getAuthenticatedUser()
    const video = formData.get('video') as File

    const validatedData = videoSchema.safeParse({ video })

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      }
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
      include: {
        plan: true,
        videos: true,
      },
    })

    if (!vendor) {
      return {
        success: false,
        message: 'Vendor not found.',
      }
    }

    const videoLimit = vendor.plan.videoLimit
    const videosUploaded = vendor.videos.length

    if (videosUploaded >= videoLimit) {
      return {
        success: false,
        message: 'You have reached your video upload limit.',
      }
    }

    const videoUrl = await uploadVideoFile(validatedData.data.video)

    if (!videoUrl) {
      return {
        success: false,
        message: 'Failed to upload video. Please try again.',
      }
    }

    await prisma.video.create({
      data: {
        url: videoUrl,
        vendorId: vendor.id,
      },
    })

    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Video uploaded successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}

export async function deleteVendorVideo(videoId: string) {
  try {
    const auth = await getAuthenticatedUser()

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
        vendor: {
          firebaseUid: auth.uid,
        },
      },
    })

    if (!video) {
      return {
        success: false,
        message: 'Video not found or you do not have permission to delete it.',
      }
    }

    const deleted = await deleteVideoFile(video.url)

    if (!deleted) {
      return {
        success: false,
        message: 'Failed to delete video from storage. Please try again.',
      }
    }

    await prisma.video.delete({
      where: {
        id: videoId,
      },
    })

    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Video deleted successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}

export async function updateVendorAvailability(data: AvailabilityData) {
  try {
    const auth = await getAuthenticatedUser()
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: auth.uid,
      },
      select: { id: true },
    })

    if (!vendor) {
      return {
        success: false,
        message: 'Vendor not found.',
      }
    }

    const validatedData = AvailabilitySchema.safeParse(data)

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      }
    }

    await prisma.availability.upsert({
      where: {
        vendorId: vendor.id,
      },
      update: {
        startTime: validatedData.data.startTime,
        endTime: validatedData.data.endTime,
      },
      create: {
        vendorId: vendor.id,
        startTime: validatedData.data.startTime,
        endTime: validatedData.data.endTime,
      },
    })

    revalidatePath('/vendor/profile')
    return {
      success: true,
      message: 'Availability updated successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}

export async function updateBookingRequest(bookingId: string, action: string) {
  try {
    const session = await getAuthenticatedUser()
    if (!session) {
      throw new Error('Vendor not authenticated')
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: session.uid,
      },
    })

    if (!vendor) {
      throw new Error('Vendor not found')
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
        vendorId: vendor.id,
      },
    })
    if (!booking) {
      throw new Error('Booking not found')
    }

    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: action === 'accept' ? 'CONFIRMED' : 'REJECTED',
      },
    })

    return {
      success: true,
      message:
        action === 'accept'
          ? 'Booking request accepted successfully'
          : 'Booking request rejected successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: true,
      message: 'Failed to accept booking request',
    }
  }
}
