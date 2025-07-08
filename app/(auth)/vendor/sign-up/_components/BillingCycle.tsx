'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect, useState } from 'react'
import { BillingCycle as BillingCycleEnum, Plan } from '@prisma/client'
import { Button } from '@/components/ui/button'
import BillingCycleCard from './BillingCycleCard'
import { getPlanById } from '@/actions/vendor/actions'

const BillingCycle = () => {
  const { vendorData, setVendorData, prevStep, nextStep, step } =
    useVendorStore()
  const [selectedBillingCycle, setSelectedBillingCycle] =
    useState<BillingCycleEnum>(vendorData.billingCycle || 'MONTHLY')
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const fetchPlan = async () => {
      if (vendorData.planId) {
        try {
          const result = await getPlanById(vendorData.planId)
          if (result.success && result.data) {
            setPlan(result.data)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchPlan()
  }, [vendorData.planId])

  useEffect(() => {
    setVendorData({ billingCycle: selectedBillingCycle })
  }, [selectedBillingCycle, setVendorData])

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Choose Your Billing Cycle</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(BillingCycleEnum).map((cycle) => (
          <BillingCycleCard
            key={cycle}
            cycle={cycle}
            plan={plan}
            selectedBillingCycle={selectedBillingCycle}
            onSelect={setSelectedBillingCycle}
          />
        ))}
      </div>
      <div className="w-full flex justify-between">
        <Button onClick={prevStep}>Prev</Button>
        <Button
          onClick={nextStep}
          disabled={step === 3 && !vendorData.billingCycle}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
export default BillingCycle
