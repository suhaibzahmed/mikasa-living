'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { cn } from '@/lib/utils'

const phoneSchema = z.object({
  phone: z.string().min(10, { message: 'Phone number is required' }),
})

type PhoneData = z.infer<typeof phoneSchema>

const PhoneNumberInput = () => {
  const { setVendorData, nextStep } = useVendorStore()
  const [countryCode, setCountryCode] = useState('+91')

  const form = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
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

  const onSubmit = async (data: PhoneData) => {
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
          <FormField
            control={form.control}
            name="phone"
            render={({}) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.phone && 'text-destructive'
                  )}
                >
                  Phone Number
                </FormLabel>
                <div className="flex items-start gap-x-2 ">
                  <Select
                    onValueChange={setCountryCode}
                    defaultValue={countryCode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91 (IN)</SelectItem>
                      <SelectItem value="+1">+1 (US)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <FormInput
                      control={form.control}
                      name="phone"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </FormItem>
            )}
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
