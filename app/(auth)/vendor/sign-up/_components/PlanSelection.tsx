'use client'

import { Plan } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useVendorStore } from '@/lib/store/vendorStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const planStyles: { [key: string]: { bg: string; ring: string } } = {
  GOLD: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/40',
    ring: 'ring-yellow-400 dark:ring-yellow-500',
  },
  SILVER: {
    bg: 'bg-gray-200 dark:bg-gray-800/40',
    ring: 'ring-gray-400 dark:ring-gray-500',
  },
  BRONZE: {
    bg: 'bg-orange-200 dark:bg-orange-900/40',
    ring: 'ring-orange-400 dark:ring-orange-500',
  },
  PLATINUM: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/40',
    ring: 'ring-indigo-400 dark:ring-indigo-500',
  },
}

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={cn(
              'cursor-pointer transition-all border-0',
              planStyles[plan.type]?.bg || 'bg-gray-100 dark:bg-gray-800/40',
              {
                'ring-2 ring-offset-2': selectedPlanId === plan.id,
                [planStyles[plan.type]?.ring || 'ring-blue-500']:
                  selectedPlanId === plan.id,
              }
            )}
          >
            <CardHeader>
              <CardTitle className="dark:text-gray-50">{plan.type}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                <span className="text-3xl font-bold dark:text-gray-100">
                  &#8377;{plan.monthly}
                </span>
                /month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-x-2 dark:text-gray-200"
                  >
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
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
