'use client'

import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect, useState } from 'react'
import { BillingCycle as BillingCycleEnum, Plan } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        return `₹${plan.monthly.toLocaleString()}/month`
      case 'QUARTERLY':
        return `₹${plan.quarterly.toLocaleString()}/quarter`
      case 'YEARLY':
        return `₹${plan.yearly.toLocaleString()}/year`
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Choose Your Billing Cycle</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(BillingCycleEnum).map((cycle) => {
          const priceString = getPrice(cycle)
          const [price, period] = priceString
            ? priceString.split('/')
            : ['', '']
          return (
            <Card
              key={cycle}
              onClick={() => setSelectedBillingCycle(cycle)}
              className={cn('cursor-pointer transition-all text-center  ', {
                'ring-2 ring-offset-2 ring-primary':
                  selectedBillingCycle === cycle,
              })}
            >
              <CardHeader>
                <CardTitle className="capitalize">
                  {cycle.toLowerCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-primary">{price}</span>
                {period && (
                  <p className="text-sm text-muted-foreground">/ {period}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
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
