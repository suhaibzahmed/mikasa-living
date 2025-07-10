'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { imageSchema } from '@/schemas/vendor.schema'
import { uploadVendorPhoto } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import { Vendor } from '@prisma/client'
import VerificationPending from './VerificationPending'

type VendorPhotosProps = {
  vendor: Vendor | null
}

const VendorPhotos = ({ vendor }: VendorPhotosProps) => {
  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: undefined,
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
    const formData = new FormData()
    formData.append('image', values.image)

    const res = await uploadVendorPhoto(formData)

    if (res.success) {
      toast.success(res.message)
      form.reset()
    } else {
      toast.error(res.message)
    }
  }

  if (vendor?.verificationStatus !== 'VERIFIED') {
    return <VerificationPending />
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSubmitButton
            isPending={isSubmitting}
            title="Upload Photo"
            pendingText="Uploading..."
          />
        </form>
      </Form>
    </div>
  )
}

export default VendorPhotos
