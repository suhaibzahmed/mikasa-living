'use server'

import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'

export const checkVendorAuth = async () => {
  const session = await verifySession()
  // console.log('🚀 ~ checkVendorAuth ~ session:', session)
  if (!session) {
    redirect('/vendor/sign-in')
  }
  return session
}

export const checkUserAuth = async () => {
  const session = await verifySession()
  return session
}

export const checkAdminAuth = async () => {
  const session = await verifySession()
  // console.log('🚀 ~ checkAdminAuth ~ session:', session)
  if (!session) {
    redirect('/admin/sign-in')
  }
  return session
}
