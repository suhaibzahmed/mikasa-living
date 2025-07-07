'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
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

type Vendor = PrismaVendor & {
  plan: Plan
}

interface VendorTableProps {
  initialVendors: Vendor[]
}

const VendorTable = ({ initialVendors }: VendorTableProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [verifiedFilter, setVerifiedFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')

  const filteredVendors = initialVendors
    .filter((vendor) =>
      vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((vendor) => {
      if (verifiedFilter === 'all') return true
      return vendor.isVerified === (verifiedFilter === 'verified')
    })
    .filter((vendor) => {
      if (planFilter === 'all') return true
      return vendor.plan.type === planFilter
    })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-x-4">
        <Input
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
        />
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verification</SelectItem>
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
          {filteredVendors.map((vendor) => (
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
    </div>
  )
}

export default VendorTable
