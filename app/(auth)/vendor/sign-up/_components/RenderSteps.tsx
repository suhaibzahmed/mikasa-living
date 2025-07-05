'use client'
import PlanSelection from '@/app/(auth)/vendor/sign-up/_components/PlanSelection'
import VendorDetails from '@/app/(auth)/vendor/sign-up/_components/VendorDetails'
import BillingCycle from '@/app/(auth)/vendor/sign-up/_components/BillingCycle'
import PaymentForm from '@/app/(auth)/vendor/sign-up/_components/PaymentForm'
import Confirmation from '@/app/(auth)/vendor/sign-up/_components/Confirmation'
import { useVendorStore } from '@/lib/store/vendorStore'

const RenderSteps = () => {
  const { step } = useVendorStore()

  switch (step) {
    case 1:
      return <VendorDetails />
    case 2:
      return <PlanSelection />
    case 3:
      return <BillingCycle />
    case 4:
      return <PaymentForm />
    case 5:
      return <Confirmation />
    default:
      return <VendorDetails />
  }
}

export default RenderSteps
