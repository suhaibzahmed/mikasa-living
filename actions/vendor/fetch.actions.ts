'server only'

import { prisma } from '@/lib/db'
import { Plan } from '@prisma/client'

export async function getPlans() {
  try {
    const plans: Plan[] = await prisma.plan.findMany()

    console.log('🚀 ~ getPlans ~ plans:', plans)
    return plans
  } catch (error) {
    console.error(error)
    return []
  }
}
