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
import { Vendor, Plan, Photo } from '@prisma/client'
import VerificationPending from './VerificationPending'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type UploadPhotoProps = {
  vendor: (Vendor & { plan: Plan; photos: Photo[] }) | null
}

const UploadPhoto = ({ vendor }: UploadPhotoProps) => {
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

  const photoLimit = vendor?.plan?.photoLimit || 0
  const photosUploaded = vendor?.photos?.length || 0
  const photosRemaining = photoLimit - photosUploaded

  const hasReachedLimit = photosRemaining <= 0

  return (
    <div>
      <div className="mb-4">
        <p>
          You have uploaded{' '}
          <span className="font-bold">
            {photosUploaded}/{photoLimit}
          </span>{' '}
          photos.
        </p>
      </div>
      {hasReachedLimit ? (
        <div>
          <p className="text-red-500">
            You have reached your photo upload limit.
          </p>
          <Button asChild>
            <Link href="/vendor/subscription">Upgrade Plan</Link>
          </Button>
        </div>
      ) : (
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
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
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
      )}
    </div>
  )
}

export default UploadPhoto
