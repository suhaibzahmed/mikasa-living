'server only'

import { prisma } from '@/lib/db'
import { BookingStatus } from '@prisma/client'
import { getAuthenticatedUser } from '../checkAuth'

export async function getCompleteVendorDetails() {
  try {
    const checkAuth = await getAuthenticatedUser()
    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
      include: {
        plan: true,
        photos: true,
        videos: true,
        availability: true,
      },
    })
    return vendor
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getVendorBookingRequests() {
  try {
    const checkAuth = await getAuthenticatedUser()

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!vendor) {
      throw new Error('Vendor not found')
    }

    const bookings = await prisma.booking.findMany({
      where: {
        vendorId: vendor.id,
        status: { equals: BookingStatus.PENDING },
      },
      include: {
        user: true,
      },
    })

    return bookings
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getConfirmedBookings() {
  try {
    const checkAuth = await getAuthenticatedUser()

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!vendor) {
      throw new Error('Vendor not found')
    }

    const bookings = await prisma.booking.findMany({
      where: {
        vendorId: vendor.id,
        status: { equals: BookingStatus.CONFIRMED },
      },
      include: {
        user: true,
      },
      orderBy: {
        bookingDate: 'asc',
      },
    })

    return bookings
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getServiceHistory() {
  try {
    const checkAuth = await getAuthenticatedUser()

    const vendor = await prisma.vendor.findUnique({
      where: {
        firebaseUid: checkAuth.uid,
      },
    })

    if (!vendor) {
      throw new Error('Vendor not found')
    }

    const bookings = await prisma.booking.findMany({
      where: {
        vendorId: vendor.id,
        status: { equals: BookingStatus.COMPLETED },
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return bookings
  } catch (error) {
    console.log(error)
    throw error
  }
}
