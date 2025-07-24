'use server'

import { prisma } from '@/lib/db'
import { UserSignUpData } from '@/schemas/user.schema'
import { revalidatePath } from 'next/cache'
import { getAuthenticatedUser } from '../checkAuth'
import { setCustomClaims } from '@/lib/auth'

export const createUser = async (data: UserSignUpData) => {
  try {
    const checkUser = await getAuthenticatedUser()

    const existingUser = await prisma.user.findUnique({
      where: {
        firebaseUid: checkUser.uid,
      },
    })

    if (existingUser) {
      await setCustomClaims(existingUser.firebaseUid, 'USER')
      return { success: false, message: 'User already exists.' }
    }

    await prisma.user.create({
      data: {
        name: data.name,
        phone: checkUser.phone_number!,
        email: data.email,
        firebaseUid: checkUser.uid,
      },
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export const verifyUser = async (phone: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    })
    if (!user) {
      return { success: false, message: 'User not found. Please sign up.' }
    }
    return { success: true, data: user }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

// FOR USER SIDEBAR
export async function getUserSidebarDetails() {
  try {
    const checkAuth = await getAuthenticatedUser()
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
      select: {
        name: true,
        email: true,
      },
    })

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function postReview(
  vendorId: string,
  values: { comment: string; rating: number }
) {
  try {
    const checkAuth = await getAuthenticatedUser()

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!user) {
      return { success: false, message: 'User not found.' }
    }

    const review = await prisma.review.create({
      data: {
        vendorId,
        userId: user.id,
        comment: values.comment,
        rating: values.rating,
      },
    })

    revalidatePath('/vendor/:id')
    return {
      success: true,
      message: 'Review posted successfully',
      data: review,
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function bookVendor(
  vendorId: string | undefined,
  data: { bookingDate: Date; bookingTime: string; message: string }
) {
  try {
    const checkAuth = await getAuthenticatedUser()

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!user) {
      return { success: false, message: 'User not found.' }
    }

    if (!vendorId) {
      return { success: false, message: 'Vendor not found.' }
    }

    const booking = await prisma.booking.create({
      data: {
        vendorId,
        userId: user.id,
        bookingDate: data.bookingDate,
        bookingTime: data.bookingTime,
        message: data.message,
      },
    })
    console.log('🚀 ~ booking:', booking)

    revalidatePath('/vendor/:id')
    return {
      success: true,
      message: 'Booking request sent successfully',
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}

export async function getAllServices() {
  try {
    const services = await prisma.service.findMany({})
    return services
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserByFirebaseId(firebaseUid: string) {
  try {
    if (!firebaseUid) return null

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid,
      },
    })
    console.log('🚀 ~ getUserByFirebaseId ~ user:', user)

    if (!user) return null

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
