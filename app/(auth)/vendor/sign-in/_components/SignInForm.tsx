'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { VendorSignInData, vendorSignInSchema } from '@/schemas/vendor.schema'
import { Form } from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import Link from 'next/link'
import FormPhoneInput from '@/components/common/form/FormPhoneInput'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { verifyVendor } from '@/actions/vendor/actions'

const SignInForm = () => {
  const [countryCode, setCountryCode] = useState('+91')

  const router = useRouter()
  const form = useForm<VendorSignInData>({
    resolver: zodResolver(vendorSignInSchema),
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

  const onSubmit = async (data: VendorSignInData) => {
    try {
      const result = await verifyVendor(data.phone)
      if (!result.success) {
        toast.error(result.message)

        router.push('/vendor/sign-up')
        return
      }

      const verifier = window.recaptchaVerifier
      const fullPhoneNumber = `${countryCode}${data.phone}`
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        verifier
      )
      sessionStorage.setItem('auth-flow', 'signin')
      router.push('/vendor/verify-otp')
    } catch (error) {
      console.error('Failed to send OTP', error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your mobile number to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                pendingText="Sending OTP"
                isPending={form.formState.isSubmitting}
              />
              <div id="recaptcha-container"></div>
              <div className=" text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/vendor/sign-up"
                  className=" underline underline-offset-4 "
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInForm
