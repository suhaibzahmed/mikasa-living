import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Vendor, Plan } from '@prisma/client'

type VendorDetailsProps = {
  vendor: Vendor & { plan: Plan }
}

import { Badge } from '@/components/ui/badge'
import RejectVendorButton from './RejectVendorButton'
import ApproveVendorButton from './ApproveVendorButton'

const VendorDetails = ({ vendor }: VendorDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{vendor.companyName}</CardTitle>
          <Badge
            variant={
              vendor.verificationStatus === 'VERIFIED'
                ? 'default'
                : vendor.verificationStatus === 'PENDING'
                ? 'outline'
                : 'destructive'
            }
          >
            {vendor.verificationStatus}
          </Badge>
        </div>
        <CardDescription>Vendor Details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-900">Phone:</span>{' '}
                {vendor.phone}
              </p>
              <p>
                <span className="font-medium text-gray-900">Email:</span>{' '}
                {vendor.email}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Plan Details</h3>
            <div className="text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-900">Plan:</span>{' '}
                {vendor.plan.type}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Business Details</h3>
            <div className="text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-900">GST Number:</span>{' '}
                {vendor.gstNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
          <ApproveVendorButton vendorId={vendor.id} />
          <RejectVendorButton vendorId={vendor.id} />
        </div>
      </CardContent>
    </Card>
  )
}

export default VendorDetails
