'use client'
import { rejectVendor } from '@/actions/vendor/actions'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

const RejectVendorButton = ({ vendorId }: { vendorId: string }) => {
  const [isPending, startTransition] = useTransition()

  const handleReject = () => {
    startTransition(async () => {
      const vendor = await rejectVendor(vendorId)
      if (vendor.success) {
        toast.success(vendor.message)
      }
    })
  }

  return (
    <Button variant="destructive" onClick={handleReject} disabled={isPending}>
      {isPending ? 'Rejecting' : 'Reject'}
    </Button>
  )
}
export default RejectVendorButton
