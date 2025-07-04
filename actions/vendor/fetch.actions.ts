'server only'

import { prisma } from '@/lib/db'

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany()

    console.log('🚀 ~ getPlans ~ plans:', plans)
    return plans
  } catch (error) {
    console.error(error)
    return error
  }
}
