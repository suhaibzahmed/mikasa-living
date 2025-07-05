// show all available plans from db and allow user to select one
'use client'

import { Plan } from '@prisma/client'
import { useEffect, useState } from 'react'

const PlanSelection = () => {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await fetch('/api/vendor/plans')
        const data = await result.json()
        console.log('🚀 ~ fetchPlans ~ data:', data)
        setPlans(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlans()
  }, [])

  return (
    <div>
      <h4>Plan Selection</h4>
      {plans.map((plan) => (
        <div key={plan.id}>{plan.type}</div>
      ))}
    </div>
  )
}
export default PlanSelection
