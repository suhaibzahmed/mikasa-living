'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { toast } from 'sonner'
import {
  VendorVerifyOTPData,
  vendorVerifyOTPSchema,
} from '@/schemas/vendor.schema'
import FormOtpInput from '@/components/common/form/FormOtpInput'

const OtpVerification = () => {
  const { nextStep, setVendorData } = useVendorStore()

  const form = useForm<VendorVerifyOTPData>({
    resolver: zodResolver(vendorVerifyOTPSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: VendorVerifyOTPData) => {
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
    <div className="w-full flex flex-col items-center gap-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormOtpInput
            control={form.control}
            name="otp"
            label="One-Time Password"
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
