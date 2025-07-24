'use server'
import { clientConfig, serverConfig } from '@/lib/firebase/config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export async function getAuthenticatedUser() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  console.log('🚀 ~ tokens ~ tokens:', tokens?.decodedToken)

  if (!tokens) {
    return null
    // throw new Error('Not authenticated')
  }

  return tokens?.decodedToken
}
