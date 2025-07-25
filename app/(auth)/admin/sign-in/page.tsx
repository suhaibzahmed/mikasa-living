'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/client'
import { toast } from 'sonner'
import { useAuth } from '@/components/AuthProvider'
import { createAdmin } from '@/actions/admin/actions'
import { setCustomClaims } from '@/lib/auth'

export default function AdminSignIn() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      await createAdmin(userCredential.user.uid, email)
      const idToken = await userCredential.user.getIdToken()
      await setCustomClaims(user?.uid, 'ADMIN')

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      toast.success('Logged in successfully')
      router.push('/admin/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
