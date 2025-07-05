'use client'

import { useVendorStore } from '@/lib/store/vendorStore'

const Steps = () => {
  const { step } = useVendorStore()

  const steps = [
    { number: 1, title: 'Vendor Details' },
    { number: 2, title: 'Select Plan' },
  ]

  return (
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
  )
}

export default Steps
