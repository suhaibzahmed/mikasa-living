'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createUser } from '@/actions/user/actions'
import {
  UserSignUpData,
  VerifyOTPData,
  verifyOTPSchema,
} from '@/schemas/user.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'

const VerifyOtpPage = () => {
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
      await confirmationResult.confirm(data.otp)
      const userString = sessionStorage.getItem('user-signup-data')
      if (!userString) {
        throw new Error('No user data found in session storage.')
      }
      const userData: UserSignUpData = JSON.parse(userString)
      await createUser(userData)
      toast.success('OTP verified successfully!')
      router.push('/')
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-4 min-h-svh w-full items-center justify-center p-6 md:p-10">
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
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="rounded-md border"
                          />
                          <InputOTPSlot
                            index={1}
                            className="rounded-md border"
                          />
                          <InputOTPSlot
                            index={2}
                            className="rounded-md border"
                          />
                          <InputOTPSlot
                            index={3}
                            className="rounded-md border"
                          />
                          <InputOTPSlot
                            index={4}
                            className="rounded-md border"
                          />
                          <InputOTPSlot
                            index={5}
                            className="rounded-md border"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
    </div>
  )
}

export default VerifyOtpPage
