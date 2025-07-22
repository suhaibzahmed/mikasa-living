'use server'

import { auth } from '@/lib/firebase/firebase-admin'

export async function setCustomClaims(
  uid: string,
  role: 'ADMIN' | 'VENDOR' | 'USER'
) {
  await auth.setCustomUserClaims(uid, { role })
}
