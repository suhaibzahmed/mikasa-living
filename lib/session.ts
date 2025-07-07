import 'server-only'
import { cookies } from 'next/headers'
import { authAdmin } from './firebase-admin'

export async function verifySession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  if (!sessionCookie) {
    return null
  }

  try {
    const decodedToken = await authAdmin.verifySessionCookie(
      sessionCookie,
      true
    )
    return decodedToken
  } catch {
    return null
  }
}
