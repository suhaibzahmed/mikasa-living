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

export const postReviewSchema = z.object({
  comment: z.string().min(1, {
    message: 'Please provide comment.',
  }),
  rating: z.coerce
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
})

export const vendorBookingSchema = z.object({
  bookingDate: z.date({ message: 'Booking date is required' }),
  bookingTime: z
    .string({ required_error: 'Booking time is required' })
    .min(1, 'Booking time is required'),
  message: z.string().min(1, { message: 'Message is required' }),
})

export type UserPhoneNumber = z.infer<typeof userPhoneNumberSchema>
export type UserSignUpData = z.infer<typeof userSignUpSchema>
export type UserSignInData = z.infer<typeof userSignInSchema>
export type VerifyOTPData = z.infer<typeof verifyOTPSchema>
export type PostReviewData = z.infer<typeof postReviewSchema>
export type VendorBookingData = z.infer<typeof vendorBookingSchema>
