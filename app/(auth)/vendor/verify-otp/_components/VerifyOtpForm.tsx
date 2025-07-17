'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { VerifyOTPData, verifyOTPSchema } from '@/schemas/user.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { createSession } from '@/actions/session'
import FormOtpInput from '@/components/common/form/FormOtpInput'

const VerifyOtpForm = () => {
  const router = useRouter()
  const form = useForm<VerifyOTPData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: VerifyOTPData) => {
    try {
      const confirmationResult = window.confirmationResult
      if (!confirmationResult) {
        throw new Error('No confirmation result found.')
      }
      const userCredential = await confirmationResult.confirm(data.otp)
      const idToken = await userCredential.user.getIdToken()

      const sessionResult = await createSession({ idToken, role: 'vendor' })
      if (sessionResult.success) {
        router.refresh()
        router.push('/vendor/dashboard')
        toast.success('Logged in successfully!')
      } else {
        toast.error(sessionResult.message)
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
      console.error(error)
    } finally {
      sessionStorage.removeItem('auth-flow')
      sessionStorage.removeItem('user-signin-phone')
      sessionStorage.removeItem('vendor-signup-data')
    }
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="text-center">
        <CardTitle>Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your mobile number
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <FormOtpInput
              control={form.control}
              name="otp"
              label="One-Time Password"
            />
            <FormSubmitButton
              title="Verify OTP"
              pendingText="Verifying"
              isPending={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default VerifyOtpForm
