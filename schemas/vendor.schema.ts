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

export const vendorPhoneSchema = z.object({
  phone: z.string().min(10, { message: 'Phone number is required' }),
})

export type VendorPhoneData = z.infer<typeof vendorPhoneSchema>

export const vendorVerifyOTPSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 characters long' }),
})

export type VendorVerifyOTPData = z.infer<typeof vendorVerifyOTPSchema>

export const vendorDetailsSchema = vendorRegistrationSchema.pick({
  companyName: true,
  email: true,
  gstNumber: true,
})

export type VendorDetailsData = z.infer<typeof vendorDetailsSchema>

export const paymentSchema = z.object({
  cardNumber: z.string().min(5).max(16),
  expiryDate: z.string().min(5).max(5),
  cvc: z.string().min(3).max(3),
})

export type PaymentData = z.infer<typeof paymentSchema>
