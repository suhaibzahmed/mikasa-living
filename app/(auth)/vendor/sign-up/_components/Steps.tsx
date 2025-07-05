'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { Button } from '@/components/ui/button'

const Steps = () => {
  const { step, nextStep, prevStep, vendorData } = useVendorStore()

  const steps = [
    { number: 1, title: 'Vendor Details' },
    { number: 2, title: 'Select Plan' },
    { number: 3, title: 'Billing Cycle' },
    { number: 4, title: 'Payment' },
    { number: 5, title: 'Confirmation' },
  ]

  const isNextDisabled =
    (step === 2 && !vendorData.planId) ||
    (step === 3 && !vendorData.billingCycle)

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="flex items-center space-x-4">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s.number}
            </div>
            <span
              className={`ml-2 text-sm ${
                step >= s.number ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {s.title}
            </span>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-300 mx-4" />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-x-4">
        {step > 1 && step < 5 && (
          <Button onClick={prevStep} variant="outline">
            Previous
          </Button>
        )}
        {step > 1 && step < 3 && (
          <Button onClick={nextStep} disabled={isNextDisabled}>
            Next
          </Button>
        )}
        {step === 3 && (
          <Button onClick={nextStep} disabled={isNextDisabled}>
            Proceed to Payment
          </Button>
        )}
      </div>
    </div>
  )
}

export default Steps
