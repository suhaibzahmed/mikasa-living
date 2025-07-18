'server only'

import { prisma } from '@/lib/db'
import { checkVendorAuth } from '../checkAuth'
import { BookingStatus } from '@prisma/client'

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
    const session = await checkVendorAuth()
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
    const session = await checkVendorAuth()
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
    const session = await checkVendorAuth()
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
