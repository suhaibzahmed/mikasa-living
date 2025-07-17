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
import RedirectToLoginButton from '@/components/common/RedirectToLoginButton'
import { DecodedIdToken } from 'firebase-admin/auth'
import { redirect } from 'next/navigation'

type PostReviewFormProps = {
  vendorId: string
  userAuth: DecodedIdToken | null
}

export function PostReviewForm({ vendorId, userAuth }: PostReviewFormProps) {
  const form = useForm<PostReviewData>({
    resolver: zodResolver(postReviewSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  })

  async function onSubmit(values: PostReviewData) {
    if (!userAuth) {
      return redirect('/user/sign-in')
    }
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

        {userAuth ? (
          <FormSubmitButton
            title="Submit Review"
            pendingText="Submitting..."
            isPending={form.formState.isSubmitting}
          />
        ) : (
          <RedirectToLoginButton
            toastMessage="You must be logged in to post a review"
            btnText="Post Review"
          />
        )}
      </form>
    </Form>
  )
}
