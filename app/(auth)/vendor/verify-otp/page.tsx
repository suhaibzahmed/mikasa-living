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
import { VerifyOTPData, verifyOTPSchema } from '@/schemas/user.schema'
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
import { createNewVendor, verifyVendor } from '@/actions/vendor/actions'
import { VendorRegistrationData } from '@/schemas/vendor.schema'

const VerifyVendorOtpPage = () => {
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
      const firebaseUid = userCredential.user.uid

      const authFlow = sessionStorage.getItem('auth-flow')

      if (authFlow === 'signin') {
        const result = await verifyVendor(firebaseUid)
        if (!result.success) {
          toast.error(result.message)
          return
        }
        if (!result.data) {
          toast.error('Vendor not found. Please register.')
          router.push('/vendor/sign-up')
          return
        }
      } else if (authFlow === 'signup') {
        const vendorDataString = sessionStorage.getItem('vendor-signup-data')
        if (!vendorDataString) {
          throw new Error('No vendor data found in session storage.')
        }
        const vendorData: VendorRegistrationData = JSON.parse(vendorDataString)
        const result = await createNewVendor({ ...vendorData, firebaseUid })
        if (!result.success) {
          toast.error(result.message)
          return
        }
      }

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      if (response.ok) {
        toast.success('Logged in successfully!')
        router.push('/vendor/dashboard')
      } else {
        toast.error('Failed to create session.')
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

export default VerifyVendorOtpPage
