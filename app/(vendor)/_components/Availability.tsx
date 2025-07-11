'use client'

import { Availability } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AvailabilityData, AvailabilitySchema } from '@/schemas/vendor.schema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { updateVendorAvailability } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import { format, parse } from 'date-fns'
import FormInput from '@/components/common/form/FormInput'

type AvailabilityProps = {
  vendorAvailability: Availability | null
}

const AvailabilityComponent = ({ vendorAvailability }: AvailabilityProps) => {
  const defaultStartTime = vendorAvailability?.startTime || '09:00'
  const defaultEndTime = vendorAvailability?.endTime || '17:00'

  const form = useForm<AvailabilityData>({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: {
      startTime: defaultStartTime,
      endTime: defaultEndTime,
    },
  })

  const formatTimeForDisplay = (time: string) => {
    if (!time) return ''
    try {
      const date = parse(time, 'HH:mm', new Date())
      return format(date, 'hh:mm a')
    } catch (error) {
      console.log('🚀 ~ formatTimeForDisplay ~ error:', error)
      return 'Invalid time'
    }
  }

  const onSubmit = async (data: AvailabilityData) => {
    const result = await updateVendorAvailability(data)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="rounded-lg border p-6">
      <h5 className="mb-4 font-semibold">Set your daily availability time</h5>
      <div className="mb-6 flex items-center gap-6 text-sm">
        {!vendorAvailability?.startTime && !vendorAvailability?.endTime ? (
          <p>You have not set your availability time yet.</p>
        ) : (
          <div>
            <p>
              Current Start Time:{' '}
              <strong className="font-medium">
                {formatTimeForDisplay(form.watch('startTime'))}
              </strong>
            </p>
            <p>
              Current End Time:{' '}
              <strong className="font-medium">
                {formatTimeForDisplay(form.watch('endTime'))}
              </strong>
            </p>
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <FormInput
              control={form.control}
              name="startTime"
              label="Start Time"
              type="time"
            />
            <FormInput
              control={form.control}
              name="endTime"
              label="End Time"
              type="time"
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default AvailabilityComponent
