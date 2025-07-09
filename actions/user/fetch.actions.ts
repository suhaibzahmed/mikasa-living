'use server'

import { prisma } from '@/lib/db'
import { checkUserAuth } from '../checkAuth'

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
