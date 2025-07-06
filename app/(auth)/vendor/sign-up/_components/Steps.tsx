'use client'

import { useVendorStore } from '@/lib/store/vendorStore'

const Steps = () => {
  const { step } = useVendorStore()

  const steps = [
    { number: 1, title: 'Vendor Details' },
    { number: 2, title: 'Select Plan' },
    { number: 3, title: 'Billing Cycle' },
    { number: 4, title: 'Payment' },
    { number: 5, title: 'Confirmation' },
  ]
  return (
    <div className="flex items-center justify-between ">
      {steps.map((s, index) => (
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
          {/* {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-300 mx-4" />
            )} */}
        </div>
      ))}
    </div>
  )
}

export default Steps
