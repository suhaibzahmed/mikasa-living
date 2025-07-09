'use server'

import { verifySession } from '@/lib/session'
// import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

// class AuthError extends Error {
//   constructor(message = 'An authentication error occurred') {
//     super(message)
//     this.name = 'AuthError'
//   }
// }

export const checkVendorAuth = async () => {
  const session = await verifySession()
  if (!session) {
    redirect('/vendor/sign-in')
    //   throw new AuthError('Not authenticated or session expired')
  }
  return session
}

export const checkUserAuth = async () => {
  const session = await verifySession()
  if (!session) {
    return redirect('/user/sign-in')
    //   throw new AuthError('Not authenticated or session expired')
  }
  return session
}

export const checkAdminAuth = async () => {
  const session = await verifySession()
  if (!session) {
    redirect('/admin/sign-in')
  }
  return session
}
