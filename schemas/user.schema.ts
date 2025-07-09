import z from 'zod'

export const userPhoneNumberSchema = z.object({
  phone: z.string().min(10, { message: 'Phone number is required' }),
})

export const userSignInSchema = z.object({
  phone: z.string().min(10, { message: 'Phone number is required' }),
})

export const userSignUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
  phone: z.string().min(10, { message: 'Phone number is required' }),
  firebaseUid: z.string().optional(),
})

export const verifyOTPSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 characters long' }),
})

export type UserPhoneNumber = z.infer<typeof userPhoneNumberSchema>
export type UserSignUpData = z.infer<typeof userSignUpSchema>
export type UserSignInData = z.infer<typeof userSignInSchema>
export type VerifyOTPData = z.infer<typeof verifyOTPSchema>
