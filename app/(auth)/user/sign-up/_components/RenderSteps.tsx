'use client'

import { useUserStore } from '@/lib/store/userStore'
import PhoneNumberInput from './PhoneNumberInput'
import OtpVerification from './OtpVerification'
import UserDetails from './UserDetails'

const RenderSteps = () => {
  const { step } = useUserStore()

  switch (step) {
    case 1:
      return <PhoneNumberInput />
    case 2:
      return <OtpVerification />
    case 3:
      return <UserDetails />
    default:
      return <PhoneNumberInput />
  }
}

export default RenderSteps
