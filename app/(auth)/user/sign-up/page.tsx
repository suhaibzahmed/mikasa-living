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
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpData, userSignUpSchema } from '@/schemas/user.schema'
import Link from 'next/link'

const UserSignUpPage = () => {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState('+91')

  const form = useForm<UserSignUpData>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
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

  const onSubmit = async (data: UserSignUpData) => {
    try {
      const verifier = window.recaptchaVerifier
      const fullPhoneNumber = `${countryCode}${data.phone}`
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        verifier
      )
      sessionStorage.setItem('user-signup-data', JSON.stringify(data))
      router.push('/user/verify-otp')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>User Registration</h4>
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle>Create new account</CardTitle>
              <CardDescription>
                Enter your details to create account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-4"
                >
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                  />

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

                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email (optional)"
                    placeholder="john@gmail.com"
                  />

                  <FormSubmitButton
                    title="Create Account"
                    pendingText="Creating Account"
                    isPending={form.formState.isSubmitting}
                  />
                  <div id="recaptcha-container"></div>
                  <div className=" text-center text-sm">
                    Already have an account?{' '}
                    <Link
                      href="/user/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
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

export default UserSignUpPage
