'use client'

import { auth } from '@/lib/firebase/client'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export function LogoutButton() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    await fetch('/api/logout')
    toast.success('Logged out successfully')

    if (pathname.startsWith('/admin')) {
      router.push('/admin/sign-in')
    } else if (pathname.startsWith('/vendor')) {
      router.push('/vendor/sign-in')
    } else {
      router.refresh()
      router.push('/')
    }
  }

  return (
    <DropdownMenuItem onClick={handleLogout} variant="destructive">
      <LogOut />
      Logout
    </DropdownMenuItem>
  )
}
