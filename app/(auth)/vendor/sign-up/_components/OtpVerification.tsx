'use client'

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
import { useVendorStore } from '@/lib/store/vendorStore'
import { toast } from 'sonner'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { VerifyOTPData, verifyOTPSchema } from '@/schemas/user.schema'

const OtpVerification = () => {
  const { nextStep, setVendorData } = useVendorStore()

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
      const firebaseUid = userCredential.user.uid
      const idToken = await userCredential.user.getIdToken()
      setVendorData({ firebaseUid, idToken })
      nextStep()
    } catch (error) {
      console.error('Failed to verify OTP', error)
      toast.error('Invalid OTP. Please try again.')
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="rounded-md border" />
                      <InputOTPSlot index={1} className="rounded-md border" />
                      <InputOTPSlot index={2} className="rounded-md border" />
                      <InputOTPSlot index={3} className="rounded-md border" />
                      <InputOTPSlot index={4} className="rounded-md border" />
                      <InputOTPSlot index={5} className="rounded-md border" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <FormSubmitButton
              isPending={form.formState.isSubmitting}
              title="Verify OTP"
              pendingText="Verifying..."
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
export default OtpVerification
