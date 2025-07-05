'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { BillingCycle as BillingCycleEnum, Plan } from '@prisma/client'

const BillingCycle = () => {
  const { vendorData, setVendorData } = useVendorStore()
  const [selectedBillingCycle, setSelectedBillingCycle] =
    useState<BillingCycleEnum>(vendorData.billingCycle || 'MONTHLY')
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const fetchPlan = async () => {
      if (vendorData.planId) {
        try {
          const result = await fetch(`/api/vendor/plans/${vendorData.planId}`)
          const data = await result.json()
          setPlan(data)
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

  const getPrice = (cycle: BillingCycleEnum) => {
    if (!plan) return ''
    switch (cycle) {
      case 'MONTHLY':
        return `$${plan.monthly}/month`
      case 'QUARTERLY':
        return `$${plan.quarterly}/quarter`
      case 'YEARLY':
        return `$${plan.yearly}/year`
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Billing Cycle</h4>
      <RadioGroup
        onValueChange={(value: BillingCycleEnum) =>
          setSelectedBillingCycle(value)
        }
        value={selectedBillingCycle}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Object.values(BillingCycleEnum).map((cycle) => (
          <div
            key={cycle}
            className="flex items-center space-x-2 rounded-md border p-4"
          >
            <RadioGroupItem value={cycle} id={cycle} />
            <Label htmlFor={cycle} className="flex flex-col">
              <span className="font-medium">{cycle}</span>
              <span className="text-sm text-muted-foreground">
                {getPrice(cycle)}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
export default BillingCycle
