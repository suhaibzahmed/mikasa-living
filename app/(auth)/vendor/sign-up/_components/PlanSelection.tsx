'use client'

import { Plan } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useVendorStore } from '@/lib/store/vendorStore'
import { Button } from '@/components/ui/button'
import PlanCard from './PlanCard'
import { getPlans } from '@/actions/vendor/actions'

const PlanSelection = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const { vendorData, setVendorData, prevStep, nextStep, step } =
    useVendorStore()
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    vendorData.planId || ''
  )

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await getPlans()
        if (result.success && result.data) {
          setPlans(result.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlans()
  }, [])

  useEffect(() => {
    setVendorData({ planId: selectedPlanId })
  }, [selectedPlanId, setVendorData])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selectedPlanId={selectedPlanId}
            onSelect={setSelectedPlanId}
          />
        ))}
      </div>

      <div className="w-full flex justify-between">
        <Button onClick={prevStep}>Prev</Button>
        <Button onClick={nextStep} disabled={step === 2 && !vendorData.planId}>
          Next
        </Button>
      </div>
    </div>
  )
}
export default PlanSelection
