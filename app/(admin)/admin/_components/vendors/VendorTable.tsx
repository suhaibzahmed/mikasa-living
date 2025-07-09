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
import Link from 'next/link'

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
  const [verificationFilter, setVerificationFilter] = useState(
    searchParams.get('verificationStatus') || 'all'
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
    if (verificationFilter !== 'all') {
      params.set('verificationStatus', verificationFilter)
    } else {
      params.delete('verificationStatus')
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
    verificationFilter,
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
        <Select
          value={verificationFilter}
          onValueChange={setVerificationFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="VERIFIED">Verified</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
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
            <TableHead>Verification Status</TableHead>
            <TableHead>GST Number</TableHead>
            <TableHead>Details</TableHead>
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
              <TableCell>{vendor.verificationStatus}</TableCell>
              <TableCell>{vendor.gstNumber}</TableCell>
              <TableCell>
                <Button asChild variant="link" size="sm">
                  <Link href={`/admin/vendor-management/${vendor.id}`}>
                    View Details
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                {vendor.verificationStatus === 'VERIFIED' ? (
                  <p>-</p>
                ) : vendor.verificationStatus === 'REJECTED' ? (
                  <p className="text-bold text-red-500">Rejected</p>
                ) : (
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                  </div>
                )}
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
