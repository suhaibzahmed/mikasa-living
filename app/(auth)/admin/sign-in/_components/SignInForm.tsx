'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AdminLoginData, adminLoginSchema } from '@/schemas/admin.schema'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { verifyAdminAndCreateSession } from '@/actions/admin/actions'

const AdminSignInForm = () => {
  const router = useRouter()
  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AdminLoginData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const idToken = await userCredential.user.getIdToken()
      const result = await verifyAdminAndCreateSession(idToken)

      if (result.success) {
        router.refresh()
        router.push('/admin/dashboard')
        toast.success('Logged in successfully!')
      } else {
        toast.error(result.message || 'An unknown error occurred')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Invalid email or password')
      } else {
        toast.error('An unknown error occurred during sign-in.')
      }
    }
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your details to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="john@doe.com"
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="********"
              />
              <FormSubmitButton
                title="Login"
                pendingText="Logging in"
                isPending={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminSignInForm
