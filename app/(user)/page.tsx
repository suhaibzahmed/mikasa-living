'use client'

import { useEffect, useState } from 'react'
import { UserSignUpData } from '@/schemas/user.schema'

const UserLandingPage = () => {
  const [user, setUser] = useState<UserSignUpData | null>(null)

  useEffect(() => {
    const userString = sessionStorage.getItem('user-signup-data')
    if (userString) {
      setUser(JSON.parse(userString))
      sessionStorage.removeItem('user-signup-data')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      {user ? (
        <div className="p-4 border rounded-md">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  )
}
export default UserLandingPage
