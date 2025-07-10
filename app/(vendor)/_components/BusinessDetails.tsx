'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Vendor } from '@prisma/client'
import { updateVendorDetails } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import { updateVendorDetailsSchema } from '@/schemas/vendor.schema'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import FormTextArea from '@/components/common/form/FormTextArea'

const BusinessDetails = ({
  vendorDetails,
}: {
  vendorDetails: Vendor | null
}) => {
  const form = useForm<z.infer<typeof updateVendorDetailsSchema>>({
    resolver: zodResolver(updateVendorDetailsSchema),
    defaultValues: {
      companyName: vendorDetails?.companyName || '',
      gstNumber: vendorDetails?.gstNumber || '',
      phone: vendorDetails?.phone || '',
      email: vendorDetails?.email || '',
      description: vendorDetails?.description || '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof updateVendorDetailsSchema>) {
    const res = await updateVendorDetails(values)
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          name="companyName"
          label="Company Name"
          placeholder="Your Company Name"
        />
        <FormInput
          control={form.control}
          name="gstNumber"
          label="GST Number"
          placeholder="Your GST Number"
        />
        <FormInput
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Your Phone Number"
        />
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Your Email Address"
          type="email"
        />
        <FormTextArea
          control={form.control}
          name="description"
          label="Description"
          placeholder="Tell us a little bit about your company"
          className="resize-none"
        />
        <FormSubmitButton
          isPending={isSubmitting}
          title="Save Changes"
          pendingText="Saving"
        />
      </form>
    </Form>
  )
}
export default BusinessDetails
