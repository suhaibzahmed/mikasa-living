'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { VendorPhoneData, vendorPhoneSchema } from '@/schemas/vendor.schema'
import FormPhoneInput from '@/components/common/form/FormPhoneInput'

const PhoneNumberInput = () => {
  const { setVendorData, nextStep } = useVendorStore()
  const [countryCode, setCountryCode] = useState('+91')

  const form = useForm<VendorPhoneData>({
    resolver: zodResolver(vendorPhoneSchema),
    defaultValues: {
      phone: '',
    },
  })

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
      }
    )
  }, [])

  const onSubmit = async (data: VendorPhoneData) => {
    try {
      const verifier = window.recaptchaVerifier
      const fullPhoneNumber = `${countryCode}${data.phone}`
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        verifier
      )
      setVendorData({ phone: data.phone })
      nextStep()
    } catch (error) {
      console.error('Failed to send OTP', error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormPhoneInput
            control={form.control}
            name="phone"
            label="Phone Number"
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
          <div id="recaptcha-container"></div>
          <div className="w-full flex justify-end">
            <FormSubmitButton
              isPending={form.formState.isSubmitting}
              title="Send OTP"
              pendingText="Sending OTP"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
export default PhoneNumberInput
