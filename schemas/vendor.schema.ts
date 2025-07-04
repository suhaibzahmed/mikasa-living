import { z } from 'zod'

export const registrationSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  companyName: z.string().min(3).max(50),
  gstNumber: z.string().min(3).max(50),
})

export const planSelectionSchema = z.object({
  planType: z.enum(['SILVER', 'GOLD', 'DIAMOND', 'PLATINUM']),
})

export const billingCycleSchema = z.enum(['monthly', 'yearly'])

export const paymentSchema = z.object({
  cardNumber: z.string().min(16).max(19),
  expiryDate: z.string().min(5).max(5),
  cvv: z.string().min(3).max(4),
  cardholderName: z.string().min(2).max(50),
})

export type RegisterData = z.infer<typeof registrationSchema>
export type PlanSelectionData = z.infer<typeof planSelectionSchema>
export type PaymentData = z.infer<typeof paymentSchema>
