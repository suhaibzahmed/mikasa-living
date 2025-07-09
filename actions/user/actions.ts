'use server'

import { prisma } from '@/lib/db'
import { UserSignUpData } from '@/schemas/user.schema'
import { cookies } from 'next/headers'
import { checkUserAuth } from '../checkAuth'

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

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: session.uid,
      },
    })

    if (!user) {
      return { success: false, message: 'User not found' }
    }

    return { success: true, data: user }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
