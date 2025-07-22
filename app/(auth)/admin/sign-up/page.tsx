// app/register/page.tsx
'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/client'
import { createAdmin } from '@/actions/admin/actions'
import { toast } from 'sonner'
import { setCustomClaims } from '@/lib/auth'

export default function AdminSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await setCustomClaims(userCredential.user.uid, 'ADMIN')
      console.log('User signed up successfully!')
      await createAdmin(userCredential.user.uid, email)
      toast.success('Admin created successfully')

      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}
