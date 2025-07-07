'use client'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { UserSignInData, userSignInSchema } from '@/schemas/user.schema'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import FormInput from '@/components/common/form/FormInput'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { verifyUser } from '@/actions/user/actions'

const UserSignInPage = () => {
  const [countryCode, setCountryCode] = useState('+91')

  const router = useRouter()
  const form = useForm<UserSignInData>({
    resolver: zodResolver(userSignInSchema),
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

  const onSubmit = async (data: UserSignInData) => {
    try {
      const result = await verifyUser(data.phone)
      if (!result.success) {
        toast.error(result.message)
        return
      }

      if (!result.data) {
        toast.error('User not found. Please sign up.')
        router.push('/user/sign-up')
        return
      }

      const verifier = window.recaptchaVerifier
      const fullPhoneNumber = `${countryCode}${data.phone}`
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        verifier
      )
      sessionStorage.setItem('user-signin-phone', data.phone)
      sessionStorage.setItem('auth-flow', 'signin')
      router.push('/user/verify-otp')
    } catch (error) {
      console.error('Failed to send OTP', error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>User Sign In</h4>
      <div className="w-full max-w-sm">
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
                              <SelectValue
                                placeholder="+91"
                                defaultValue="+91"
                              />
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

                  <FormSubmitButton
                    title="Send OTP"
                    pendingText="Sending OTP"
                    isPending={form.formState.isSubmitting}
                  />
                  <div id="recaptcha-container"></div>
                  <div className=" text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                      href="/user/sign-up"
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
      </div>
    </div>
  )
}

export default UserSignInPage
