// take vendor details like name, phone, email, company name, gst number

'use client'

import { VendorDetailsData, vendorDetailsSchema } from '@/schemas/vendor.schema'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect } from 'react'

const VendorDetails = () => {
  const { vendorData, setVendorData, nextStep } = useVendorStore()

  const form = useForm<VendorDetailsData>({
    resolver: zodResolver(vendorDetailsSchema),
    defaultValues: {
      email: vendorData.email || '',
      phone: vendorData.phone || '',
      companyName: vendorData.companyName || '',
      gstNumber: vendorData.gstNumber || '',
    },
  })

  useEffect(() => {
    form.reset({
      email: vendorData.email || '',
      phone: vendorData.phone || '',
      companyName: vendorData.companyName || '',
      gstNumber: vendorData.gstNumber || '',
    })
  }, [vendorData, form])

  function onSubmit(data: z.infer<typeof vendorDetailsSchema>) {
    console.log(data)
    setVendorData(data)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormInput
          control={form.control}
          name="companyName"
          label="Company Name"
          placeholder="Company Name"
          type="text"
        />
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
        />
        <FormInput
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Phone"
          type="tel"
        />
        <FormInput
          control={form.control}
          name="gstNumber"
          label="GST Number"
          placeholder="GST Number"
          type="text"
        />
        <FormSubmitButton
          isPending={form.formState.isSubmitting}
          title="Next Step"
          pendingText="Adding"
        />
      </form>
    </Form>
  )
}
export default VendorDetails
