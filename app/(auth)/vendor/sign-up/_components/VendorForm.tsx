'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RegisterData, registrationSchema } from '@/schemas/vendor.schema'
import Link from 'next/link'
import { useVendorRegistration } from '@/lib/VendorRegistrationContext'

const VendorForm = () => {
  const { vendorData, setVendorData, nextStep } = useVendorRegistration()

  const form = useForm<RegisterData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: vendorData || {
      email: '',
      phone: '',
      companyName: '',
      gstNumber: '',
    },
  })

  async function onSubmit(data: RegisterData) {
    setVendorData(data)
    nextStep()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gstNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="22AAAAA0000A1Z5"
                    {...field}
                    className="uppercase"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Next Step
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/vendor/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  )
}
export default VendorForm
