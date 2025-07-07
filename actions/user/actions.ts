'use server'

import { prisma } from '@/lib/db'
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
    return user
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user.')
  }
}
