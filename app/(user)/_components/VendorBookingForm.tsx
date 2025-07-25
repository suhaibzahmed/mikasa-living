'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { format, parse } from 'date-fns'
// import { bookVendor } from '@/actions/user/actions'
import { Availability } from '@prisma/client'
import { VendorBookingData, vendorBookingSchema } from '@/schemas/user.schema'
import FormPopoverDate from '@/components/common/form/FormPopoverDate'
import FormSelect from '@/components/common/form/FormSelect'
import FormTextArea from '@/components/common/form/FormTextArea'
import { bookVendor } from '@/actions/user/actions'
import { useRouter } from 'next/navigation'

type VendorBookingFormProps = {
  vendorId: string | undefined
  availability: Availability | null | undefined
}

const VendorBookingForm = ({
  vendorId,
  availability,
}: VendorBookingFormProps) => {
  const router = useRouter()
  const form = useForm<VendorBookingData>({
    resolver: zodResolver(vendorBookingSchema),
    defaultValues: {
      bookingDate: undefined,
      bookingTime: '',
      message: '',
    },
  })
  console.log('Available slots:', availability)

  const generateTimeSlots = () => {
    if (!availability) return []
    const slots = []
    const [startHour] = availability.startTime.split(':').map(Number)
    const [endHour] = availability.endTime.split(':').map(Number)

    for (let i = startHour; i <= endHour; i++) {
      const time = new Date()
      time.setHours(i, 0, 0, 0)
      slots.push(format(time, 'h:mm a'))
    }
    return slots
  }

  async function onSubmit(values: VendorBookingData) {
    const date = parse(values.bookingTime, 'h:mm a', new Date())
    const convertedTime = format(date, 'HH:mm')
    const updatedValues = {
      ...values,
      bookingTime: convertedTime,
    }
    const res = await bookVendor(vendorId, updatedValues)
    if (res.success) {
      toast.success('Booking request sent successfully')
      form.reset()
      router.push('/bookings')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4 ">
          <FormPopoverDate
            name="bookingDate"
            control={form.control}
            label="Booking Date"
            placeholder="Pick a date"
          />
          <FormSelect
            name="bookingTime"
            control={form.control}
            label="Booking Time"
            items={generateTimeSlots()}
            placeholder="Select a time"
            className="w-full"
          />
        </div>

        <FormTextArea
          control={form.control}
          name="message"
          label="Message"
          placeholder="Any additional information for the vendor"
        />
        <FormSubmitButton
          title="Send Booking Request"
          pendingText="Sending..."
          isPending={form.formState.isSubmitting}
          className="w-full"
        />
      </form>
    </Form>
  )
}

export default VendorBookingForm
