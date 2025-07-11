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
import { videoSchema } from '@/schemas/vendor.schema'
import { uploadVendorVideo } from '@/actions/vendor/actions'
import { toast } from 'sonner'
import { Vendor, Plan, Video } from '@prisma/client'
import VerificationPending from './VerificationPending'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type UploadVideoProps = {
  vendor: (Vendor & { plan: Plan; videos: Video[] }) | null
}

const UploadVideo = ({ vendor }: UploadVideoProps) => {
  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      video: undefined,
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: z.infer<typeof videoSchema>) => {
    const formData = new FormData()
    formData.append('video', values.video)

    const res = await uploadVendorVideo(formData)

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

  const videoLimit = vendor?.plan?.videoLimit || 0
  const videosUploaded = vendor?.videos?.length || 0
  const videosRemaining = videoLimit - videosUploaded

  const hasReachedLimit = videosRemaining <= 0

  return (
    <div>
      <div className="mb-4">
        <p>
          You have uploaded{' '}
          <span className="font-bold">
            {videosUploaded}/{videoLimit}
          </span>{' '}
          videos.
        </p>
      </div>
      {hasReachedLimit ? (
        <div>
          <p className="text-red-500">
            You have reached your video upload limit.
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
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Video</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
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
              title="Upload Video"
              pendingText="Uploading..."
            />
          </form>
        </Form>
      )}
    </div>
  )
}

export default UploadVideo
