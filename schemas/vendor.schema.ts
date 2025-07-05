import { z } from 'zod'

export const vendorDetailsSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  companyName: z.string().min(3).max(50),
  gstNumber: z.string().min(3).max(50),
})

export const vendorPlanSchema = z.object({
  planType: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']),
})

export const vendorBillingCycleSchema = z.object({
  billingCycle: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY']),
})

export type VendorDetailsData = z.infer<typeof vendorDetailsSchema>
export type VendorPlanData = z.infer<typeof vendorPlanSchema>
export type VendorBillingCycleData = z.infer<typeof vendorBillingCycleSchema>
