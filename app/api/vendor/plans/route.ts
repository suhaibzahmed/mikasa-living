import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const plans = await prisma.plan.findMany()
    return NextResponse.json(plans)
  } catch (error) {
    console.log(error)
  }
}
