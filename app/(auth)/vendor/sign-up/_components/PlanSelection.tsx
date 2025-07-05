// show all available plans from db and allow user to select one
'use client'

import { Plan } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useVendorStore } from '@/lib/store/vendorStore'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const PlanSelection = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const { vendorData, setVendorData } = useVendorStore()
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    vendorData.planId || ''
  )

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await fetch('/api/vendor/plans')
        const data = await result.json()
        setPlans(data)
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
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Plan Selection</h4>
      <RadioGroup
        onValueChange={setSelectedPlanId}
        value={selectedPlanId}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex items-center space-x-2 rounded-md border p-4"
          >
            <RadioGroupItem value={plan.id} id={plan.id} />
            <Label htmlFor={plan.id} className="flex flex-col">
              <span className="font-medium">{plan.type}</span>
              <span className="text-sm text-muted-foreground">
                {plan.features.join(', ')} - ${plan.monthly}/month
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
export default PlanSelection
