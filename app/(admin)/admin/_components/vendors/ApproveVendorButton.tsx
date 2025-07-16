'use client'
import { approveVendor } from '@/actions/admin/actions'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

const ApproveVendorButton = ({ vendorId }: { vendorId: string }) => {
  const [isPending, startTransition] = useTransition()

  const handleApprove = () => {
    startTransition(async () => {
      const vendor = await approveVendor(vendorId)
      if (vendor.success) {
        toast.success(vendor.message)
      }
    })
  }

  return (
    <Button onClick={handleApprove} disabled={isPending} size="sm">
      {isPending ? 'Approving' : 'Approve'}
    </Button>
  )
}
export default ApproveVendorButton
