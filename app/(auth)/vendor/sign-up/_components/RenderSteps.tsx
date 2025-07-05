'use client'
import PlanSelection from '@/app/(auth)/vendor/sign-up/_components/PlanSelection'
import VendorDetails from '@/app/(auth)/vendor/sign-up/_components/VendorDetails'
import { useVendorStore } from '@/lib/store/vendorStore'

const RenderSteps = () => {
  const { step } = useVendorStore()

  switch (step) {
    case 1:
      return <VendorDetails />
    case 2:
      return <PlanSelection />
    default:
      return <VendorDetails />
  }
}

export default RenderSteps
