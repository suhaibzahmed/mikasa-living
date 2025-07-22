'use client'
import PlanSelection from '@/app/(auth)/vendor/sign-up/_components/PlanSelection'
import VendorDetails from '@/app/(auth)/vendor/sign-up/_components/VendorDetails'
import BillingCycle from '@/app/(auth)/vendor/sign-up/_components/BillingCycle'
import PaymentForm from '@/app/(auth)/vendor/sign-up/_components/PaymentForm'
import Confirmation from '@/app/(auth)/vendor/sign-up/_components/Confirmation'
import { useVendorStore } from '@/lib/store/vendorStore'
import PhoneNumberInput from './PhoneNumberInput'

const RenderSteps = () => {
  const { step } = useVendorStore()

  switch (step) {
    case 1:
      return <PhoneNumberInput />
    case 2:
      return <VendorDetails />
    case 3:
      return <PlanSelection />
    case 4:
      return <BillingCycle />
    case 5:
      return <PaymentForm />
    case 6:
      return <Confirmation />
    default:
      return <PhoneNumberInput />
  }
}

export default RenderSteps
