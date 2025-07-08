'use client'

import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { Form } from '@/components/ui/form'
import { useVendorStore } from '@/lib/store/vendorStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createNewVendor } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import {
  paymentSchema,
  PaymentData,
  vendorRegistrationSchema,
} from '@/schemas/vendor.schema'
import { Button } from '@/components/ui/button'

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

      const validationResult = vendorRegistrationSchema.safeParse(vendorData)

      if (!validationResult.success) {
        toast.error(
          'Incomplete vendor details. Please go back and complete the form.'
        )
        console.error(validationResult.error.flatten().fieldErrors)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))
      if (!vendorData.firebaseUid) {
        toast.error('Something went wrong. Please try again.')
        return
      }
      const result = await createNewVendor({
        ...validationResult.data,
        firebaseUid: vendorData.firebaseUid,
      })
      if (result.success) {
        toast.success('Vendor created successfully!')
        nextStep()
      } else {
        toast.error(result.message)
        return
      }

      if (!vendorData.idToken) {
        toast.error('Something went wrong. Please try again.')
        return
      }

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: vendorData.idToken }),
      })

      if (!response.ok) {
        toast.error('Failed to create session.')
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
