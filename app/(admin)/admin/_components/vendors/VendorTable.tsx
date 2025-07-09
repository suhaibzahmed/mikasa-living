'use client'

import { VENDOR_PAGE_SIZE } from '@/constants/config'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Vendor as PrismaVendor, Plan } from '@prisma/client'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'

type Vendor = PrismaVendor & {
  plan: Plan
}

interface VendorTableProps {
  initialVendors: Vendor[]
  currentPage: number
  totalCount: number
}

const VendorTable = ({
  initialVendors,
  currentPage,
  totalCount,
}: VendorTableProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('vendor') || '')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [verifiedFilter, setVerifiedFilter] = useState(
    searchParams.get('isVerified') || 'all'
  )
  const [planFilter, setPlanFilter] = useState(
    searchParams.get('plan') || 'all'
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearchTerm) {
      params.set('vendor', debouncedSearchTerm)
    } else {
      params.delete('vendor')
    }
    if (verifiedFilter !== 'all') {
      params.set('isVerified', verifiedFilter)
    } else {
      params.delete('isVerified')
    }
    if (planFilter !== 'all') {
      params.set('plan', planFilter)
    } else {
      params.delete('plan')
    }
    params.set('page', '1') // Reset to first page on filter change
    router.replace(`${pathname}?${params.toString()}`)
  }, [
    debouncedSearchTerm,
    verifiedFilter,
    planFilter,
    router,
    pathname,
    searchParams,
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-x-4">
        <Input
          placeholder="Search by vendor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
        />
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="BRONZE">Bronze</SelectItem>
            <SelectItem value="SILVER">Silver</SelectItem>
            <SelectItem value="GOLD">Gold</SelectItem>
            <SelectItem value="PLATINUM">Platinum</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>
          Found {totalCount} vendor{totalCount > 1 ? 's' : ''}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>GST Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialVendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.companyName}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.plan.type}</TableCell>
              <TableCell>
                {vendor.isVerified ? 'Verified' : 'Unverified'}
              </TableCell>
              <TableCell>{vendor.gstNumber}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Approve
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationWithLinks
        page={currentPage}
        pageSize={VENDOR_PAGE_SIZE}
        totalCount={totalCount}
      />
    </div>
  )
}

export default VendorTable
