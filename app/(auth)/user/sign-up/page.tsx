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
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpData, userSignUpSchema } from '@/schemas/user.schema'

const UserSignUpPage = () => {
  const router = useRouter()
  const form = useForm<UserSignUpData>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const onSubmit = (data: UserSignUpData) => {
    console.log(data)
    router.push('/')
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
                          <Select>
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

                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email (optional)"
                    placeholder="john@gmail.com"
                  />

                  <FormSubmitButton
                    title="Login"
                    pendingText="Logging in"
                    isPending={form.formState.isSubmitting}
                  />
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
