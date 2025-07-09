'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import Link from 'next/link'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { USER_PAGE_SIZE } from '@/constants/config'

interface UserTableProps {
  initialUsers: User[]
  currentPage: number
  totalCount: number
}

const UserTable = ({
  initialUsers,
  currentPage,
  totalCount,
}: UserTableProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearchTerm) {
      params.set('user', debouncedSearchTerm)
    } else {
      params.delete('user')
    }
    params.set('page', '1') // Reset to first page on filter change
    router.replace(`${pathname}?${params.toString()}`)
  }, [debouncedSearchTerm, router, pathname, searchParams])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by user name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
        />
      </div>
      <Table>
        <TableCaption>
          Found {totalCount} users{totalCount > 1 ? 's' : ''}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Total Bookings</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
              <TableCell>
                <Button asChild variant="link" size="sm">
                  <Link href={`/admin/user-management/${user.id}`}>
                    View Details
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationWithLinks
        page={currentPage}
        pageSize={USER_PAGE_SIZE}
        totalCount={totalCount}
      />
    </div>
  )
}

export default UserTable
