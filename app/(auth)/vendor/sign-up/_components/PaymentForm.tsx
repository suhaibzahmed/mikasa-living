'use client'

import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { Form } from '@/components/ui/form'
import { useVendorStore } from '@/lib/store/vendorStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createNewVendor } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import { vendorRegistrationSchema } from '@/schemas/vendor.schema'

const paymentSchema = z.object({
  cardNumber: z.string().min(5).max(16),
  expiryDate: z.string().min(5).max(5),
  cvc: z.string().min(3).max(3),
})

const PaymentForm = () => {
  const { vendorData, nextStep } = useVendorStore()

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  })

  async function onSubmit(data: z.infer<typeof paymentSchema>) {
    try {
      console.log('Payment details (not stored):', data)

      const validationResult = vendorRegistrationSchema.safeParse(vendorData)

      if (!validationResult.success) {
        toast.error(
          'Incomplete vendor details. Please go back and complete the form.'
        )
        console.error(validationResult.error.flatten().fieldErrors)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))
      const result = await createNewVendor(validationResult.data)
      if (result.success) {
        toast.success(result.message)
        nextStep()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormInput
          control={form.control}
          name="cardNumber"
          label="Card Number"
          placeholder="**** **** **** ****"
        />
        <FormInput
          control={form.control}
          name="expiryDate"
          label="Expiry Date"
          placeholder="MM/YY"
        />
        <FormInput
          control={form.control}
          name="cvc"
          label="CVC"
          placeholder="***"
        />
        <FormSubmitButton
          isPending={form.formState.isSubmitting}
          title="Confirm Payment"
          pendingText="Processing..."
        />
      </form>
    </Form>
  )
}

export default PaymentForm
