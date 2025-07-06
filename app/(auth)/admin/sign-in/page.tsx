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

const AdminSignInPage = () => {
  const router = useRouter()
  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: AdminLoginData) => {
    console.log(data)
    router.push('/admin/dashboard')
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>Admin Sign-in</h4>
      <div className="w-full max-w-sm">
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
      </div>
    </div>
  )
}

export default AdminSignInPage
