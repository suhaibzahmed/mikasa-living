'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { postReview } from '@/actions/user/actions'
import { toast } from 'sonner'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import FormTextArea from '@/components/common/form/FormTextArea'
import { PostReviewData, postReviewSchema } from '@/schemas/user.schema'

type PostReviewFormProps = {
  vendorId: string
}

export function PostReviewForm({ vendorId }: PostReviewFormProps) {
  const form = useForm<PostReviewData>({
    resolver: zodResolver(postReviewSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  })

  async function onSubmit(values: PostReviewData) {
    const res = await postReview(vendorId, values)
    if (res.success) {
      toast.success('Review posted successfully')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          control={form.control}
          name="rating"
          label="Rating"
          type="number"
        />
        <FormTextArea
          control={form.control}
          name="comment"
          label="Comment"
          placeholder="Tell us about your experience"
        />
        <FormSubmitButton
          title="Submit Review"
          pendingText="Submitting..."
          isPending={form.formState.isSubmitting}
        />
      </form>
    </Form>
  )
}
