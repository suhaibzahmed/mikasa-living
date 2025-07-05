import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ planId: string }>
  }
) {
  try {
    const { planId } = await params
    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    })
    return NextResponse.json(plan)
  } catch (error) {
    console.log('[PLANS_ID]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
