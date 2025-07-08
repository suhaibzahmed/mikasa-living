import { z } from 'zod'

export const vendorRegistrationSchema = z.object({
  firebaseUid: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  companyName: z.string().min(3).max(50),
  gstNumber: z.string().min(3).max(50),
  planId: z.string(),
  billingCycle: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY']),
})

export type VendorRegistrationData = z.infer<typeof vendorRegistrationSchema>

export const vendorSignInSchema = z.object({
  phone: z.string().min(10, { message: 'Phone number is required' }),
})

export type VendorSignInData = z.infer<typeof vendorSignInSchema>
