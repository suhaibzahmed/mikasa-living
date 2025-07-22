import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { serverConfig } from './config'

if (!getApps().length) {
  initializeApp({
    credential: cert(serverConfig.serviceAccount),
  })
}

export const auth = getAuth()
