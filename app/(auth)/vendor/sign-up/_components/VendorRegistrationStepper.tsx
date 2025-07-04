'use client'

import VendorForm from './VendorForm'
import PlanSelection from './PlanSelection'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'
import { useVendorRegistration } from '@/lib/VendorRegistrationContext'

const VendorRegistrationStepper = () => {
  const { step } = useVendorRegistration()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <VendorForm />
      case 2:
        return <PlanSelection />
      case 3:
        return <PaymentForm />
      case 4:
        return <Confirmation />
      default:
        return <VendorForm />
    }
  }

  return (
    <div>
      {/* Simple step indicator */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  )
}

export default VendorRegistrationStepper
