'use client'

import { useVendorStore } from '@/lib/store/vendorStore'

const Steps = () => {
  const { step } = useVendorStore()

  const steps = [
    { number: 1, title: 'Phone Number' },
    { number: 2, title: 'Verify OTP' },
    { number: 3, title: 'Vendor Details' },
    { number: 4, title: 'Select Plan' },
    { number: 5, title: 'Billing Cycle' },
    { number: 6, title: 'Payment' },
    { number: 7, title: 'Confirmation' },
  ]
  return (
    <div className="flex items-center justify-between ">
      {steps.map((s) => (
        <div key={s.number} className="flex  items-center">
          <div className="flex flex-col items-center gap-y-2">
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium ${
                step >= s.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {s.number}
            </div>
            <span
              className={`text-sm ${
                step >= s.number ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {s.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Steps
