// firebase/client.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { clientConfig } from './config'

const apps = getApps()
if (!apps.length) {
  initializeApp(clientConfig)
}

export const auth = getAuth()
