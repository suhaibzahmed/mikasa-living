'server only'

import { prisma } from '@/lib/db'
import { BookingStatus } from '@prisma/client'
import { getAuthenticatedUser } from '../checkAuth'

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

export async function getUserByReviewId(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserBookings() {
  try {
    const checkAuth = await getAuthenticatedUser()

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
        status: { notIn: [BookingStatus.REJECTED, BookingStatus.COMPLETED] },
      },
      include: {
        vendor: true,
      },
    })

    return bookings
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserBookingHistory() {
  try {
    const checkAuth = await getAuthenticatedUser()

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
        status: { in: [BookingStatus.COMPLETED, BookingStatus.REJECTED] },
      },
      include: {
        vendor: true,
      },
    })

    return bookings
  } catch (error) {
    console.log(error)
    throw error
  }
}
