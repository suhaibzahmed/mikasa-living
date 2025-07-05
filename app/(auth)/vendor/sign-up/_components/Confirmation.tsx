'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Confirmation = () => {
  const { vendorData } = useVendorStore()
  const router = useRouter()

  useEffect(() => {
    console.log('Final Vendor Data:', vendorData)
  }, [vendorData])

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Confirmation</h4>
      <pre className="p-4 bg-gray-100 rounded-md">
        {JSON.stringify(vendorData, null, 2)}
      </pre>
      <Button onClick={() => router.push('/vendor/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  )
}

export default Confirmation
