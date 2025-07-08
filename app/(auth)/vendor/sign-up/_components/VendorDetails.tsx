// take vendor details like name, phone, email, company name, gst number

'use client'

import { vendorRegistrationSchema } from '@/schemas/vendor.schema'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect } from 'react'

const vendorDetailsSchema = vendorRegistrationSchema.pick({
  companyName: true,
  email: true,
  gstNumber: true,
})

type VendorDetailsData = z.infer<typeof vendorDetailsSchema>

const VendorDetails = () => {
  const { vendorData, setVendorData, nextStep } = useVendorStore()

  const form = useForm<VendorDetailsData>({
    resolver: zodResolver(vendorDetailsSchema),
    defaultValues: {
      email: vendorData.email || '',
      companyName: vendorData.companyName || '',
      gstNumber: vendorData.gstNumber || '',
    },
  })

  useEffect(() => {
    form.reset({
      email: vendorData.email || '',
      companyName: vendorData.companyName || '',
      gstNumber: vendorData.gstNumber || '',
    })
  }, [vendorData, form])

  function onSubmit(data: VendorDetailsData) {
    setVendorData(data)
    nextStep()
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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
            name="gstNumber"
            label="GST Number"
            placeholder="GST Number"
            type="text"
          />
          <div className="w-full flex justify-end">
            <FormSubmitButton
              isPending={form.formState.isSubmitting}
              title="Next Step"
              pendingText="Proceeding to Select Plan"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
export default VendorDetails
