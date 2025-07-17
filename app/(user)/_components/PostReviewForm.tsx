'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { postReview } from '@/actions/user/actions'
import { toast } from 'sonner'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import FormTextArea from '@/components/common/form/FormTextArea'

const formSchema = z.object({
  comment: z.string().min(10, {
    message: 'Comment must be at least 10 characters.',
  }),
  rating: z.coerce.number().min(1).max(5),
})

type PostReviewFormProps = {
  vendorId: string
}

export function PostReviewForm({ vendorId }: PostReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
