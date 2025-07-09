'use client'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VerifyOTPData, verifyOTPSchema } from '@/schemas/user.schema'
import { useUserStore } from '@/lib/store/userStore'
import FormOtpInput from '@/components/common/form/FormOtpInput'

const OtpVerification = () => {
  const { setStep, setFirebaseUid, setIdToken } = useUserStore()
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
      setFirebaseUid(userCredential.user.uid)
      setIdToken(idToken)
      setStep(3)
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
      console.error(error)
    }
  }

  return (
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
  )
}

export default OtpVerification
