import { z } from 'zod'

export const vendorRegistrationSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  companyName: z.string().min(3).max(50),
  gstNumber: z.string().min(3).max(50),
  planId: z.string().optional(),
  billingCycle: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY']).optional(),
})

export type VendorRegistrationData = z.infer<typeof vendorRegistrationSchema>
