'use client'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { UserPhoneNumber, userPhoneNumberSchema } from '@/schemas/user.schema'
import { useUserStore } from '@/lib/store/userStore'
import FormPhoneInput from '@/components/common/form/FormPhoneInput'

const PhoneNumberInput = () => {
  const { setPhone, setStep } = useUserStore()
  const [countryCode, setCountryCode] = useState('+91')
  const form = useForm<UserPhoneNumber>({
    resolver: zodResolver(userPhoneNumberSchema),
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

  const onSubmit = async (data: UserPhoneNumber) => {
    try {
      const verifier = window.recaptchaVerifier
      const fullPhoneNumber = `${countryCode}${data.phone}`
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        verifier
      )
      setPhone(data.phone)
      setStep(2)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormPhoneInput
          control={form.control}
          name="phone"
          label="Phone Number"
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <FormSubmitButton
          title="Send OTP"
          isPending={form.formState.isSubmitting}
          pendingText="Sending OTP"
        />
        <div id="recaptcha-container"></div>
      </form>
    </Form>
  )
}

export default PhoneNumberInput
