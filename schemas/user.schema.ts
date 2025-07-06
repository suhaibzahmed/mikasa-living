import z from 'zod'

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
})

export type UserSignUpData = z.infer<typeof userSignUpSchema>
export type UserSignInData = z.infer<typeof userSignInSchema>
