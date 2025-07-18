'use server'

import { prisma } from '@/lib/db'
import { UserSignUpData } from '@/schemas/user.schema'
import { cookies } from 'next/headers'
import { checkUserAuth } from '../checkAuth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createUser = async (data: UserSignUpData) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        firebaseUid: data.firebaseUid || '',
      },
    })
    return { success: true, data: user }
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

// FOR USER SIDEBAR
export async function getUserDetails() {
  try {
    const session = await checkUserAuth()

    if (!session) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: session.uid,
      },
    })

    if (!user) {
      return null
    }

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
    const session = await checkUserAuth()
    if (!session) {
      return redirect('/user/sign-in')
    }

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: session.uid,
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
    const session = await checkUserAuth()
    if (!session) {
      return redirect('/user/sign-in')
    }

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: session.uid,
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
