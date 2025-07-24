'use client'

import { useAuth } from '@/components/AuthProvider'
import RedirectToLoginButton from '@/components/common/RedirectToLoginButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import VendorBookingForm from './VendorBookingForm'
import { Availability, Plan, Review, Vendor } from '@prisma/client'

const BookConsultationButton = ({
  vendorDetails,
}: {
  vendorDetails: Vendor & {
    plan: Plan
    reviews: Review[]
    availability: Availability | null
  }
}) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <RedirectToLoginButton
        btnText="Book Consultation"
        toastMessage="Please login to book a consultation"
      />
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Book Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Request a Callback from {vendorDetails?.companyName}
          </DialogTitle>
          <DialogDescription className=" mt-6">
            <VendorBookingForm
              vendorId={vendorDetails?.id}
              availability={vendorDetails?.availability}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default BookConsultationButton
