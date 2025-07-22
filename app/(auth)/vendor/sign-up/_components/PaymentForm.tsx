'use client'

import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { Form } from '@/components/ui/form'
import { useVendorStore } from '@/lib/store/vendorStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { paymentSchema, PaymentData } from '@/schemas/vendor.schema'
import { Button } from '@/components/ui/button'
import { createVendor } from '@/actions/vendor/actions'

const PaymentForm = () => {
  const { vendorData, nextStep, prevStep } = useVendorStore()

  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  })

  async function onSubmit(data: PaymentData) {
    try {
      console.log('Payment details (not stored):', data)

      await new Promise((resolve) => setTimeout(resolve, 3000))

      const result = await createVendor(vendorData)
      if (result.success) {
        toast.success('Vendor created successfully!')
        nextStep()
      } else {
        toast.error(result.message)
        return
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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
          <div className="w-full flex justify-between">
            <Button onClick={prevStep}>Prev</Button>
            <FormSubmitButton
              isPending={form.formState.isSubmitting}
              title="Confirm Payment"
              pendingText="Processing Payment"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PaymentForm
