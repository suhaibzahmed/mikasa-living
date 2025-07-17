'use client'

import { Featured, Plan, Review, Vendor } from '@prisma/client'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateFeaturedVendors } from '@/actions/admin/actions'

type SelectFeaturedVendorsProps = {
  goldPlatinumVendors: (Vendor & {
    plan: Plan
    reviews: Review[]
    featured: Featured | null
  })[]
}

const SelectFeaturedVendors = ({
  goldPlatinumVendors,
}: SelectFeaturedVendorsProps) => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const featuredVendorIds = goldPlatinumVendors
      .filter((vendor) => vendor.featured)
      .map((vendor) => vendor.id)
    setSelectedVendors(featuredVendorIds)
  }, [goldPlatinumVendors])

  const handleCheckChange = (vendorId: string) => {
    if (selectedVendors.includes(vendorId)) {
      setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
    } else {
      setSelectedVendors([...selectedVendors, vendorId])
    }
  }

  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await updateFeaturedVendors(selectedVendors)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <div>
      <div>
        <h5>Manage Homepage &quot;Featured Vendors&quot; Section</h5>
        <p>Select up to 4 Gold/Platinum vendors to feature on the homepage.</p>
        <p>Currently selected: {selectedVendors.length}/4</p>
      </div>
      {goldPlatinumVendors.length < 1 ? (
        <p>No vendor with Gold/Platinum plan found</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {goldPlatinumVendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <CardTitle>{vendor.companyName}</CardTitle>
                  <CardDescription>
                    <p>{vendor.email}</p>
                    <Badge variant="outline">{vendor.plan.type}</Badge>
                  </CardDescription>
                  <CardAction>
                    <Checkbox
                      checked={selectedVendors.includes(vendor.id)}
                      onCheckedChange={() => handleCheckChange(vendor.id)}
                    />
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button
            onClick={handleSave}
            disabled={pending || selectedVendors.length > 4}
          >
            {pending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  )
}
export default SelectFeaturedVendors
