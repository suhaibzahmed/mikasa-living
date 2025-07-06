import z from 'zod'

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type AdminLoginData = z.infer<typeof adminLoginSchema>
