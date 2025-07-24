'use client'

import { getUserByFirebaseId } from '@/actions/user/actions'
import { useAuth } from '@/components/AuthProvider'
import { LogoutButton } from '@/components/common/LogoutButton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@prisma/client'
import { CalendarCheck, History, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const { user } = useAuth()
  const [useDetails, setUseDetails] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.uid) {
        const res = await getUserByFirebaseId(user.uid)
        if (res) {
          setUseDetails(res)
        }
      }
    }
    if (user) {
      fetchUserDetails()
    }
  }, [user])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarFallback>
            {useDetails?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <Link href="/bookings">
          <DropdownMenuItem>
            <CalendarCheck />
            My Bookings
          </DropdownMenuItem>
        </Link>
        <Link href="/bookings">
          <DropdownMenuItem>
            <History />
            Booking History
          </DropdownMenuItem>
        </Link>
        <Link href="/bookings">
          <DropdownMenuItem>
            <UserRound />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserProfile
