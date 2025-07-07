'use server'

import { prisma } from '@/lib/db'
import { getErrorMessage } from '@/lib/error'
import { UserSignUpData } from '@/schemas/user.schema'

export const createUser = async (data: UserSignUpData) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}

export const verifyUser = async (phone: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    })
    return { success: true, data: user }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) }
  }
}
