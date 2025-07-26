'use client'

import { postReview } from '@/actions/user/actions'
import { toast } from 'sonner'
import RedirectToLoginButton from '@/components/common/RedirectToLoginButton'
import { DecodedIdToken } from 'firebase-admin/auth'
import { redirect } from 'next/navigation'
import { Rating } from 'react-simple-star-rating'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type PostReviewFormProps = {
  vendorId: string
  userAuth: DecodedIdToken | null
}

export function PostReviewForm({ vendorId, userAuth }: PostReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(rating, comment)
    if (!userAuth) {
      return redirect('/user/sign-in')
    }
    const res = await postReview(vendorId, rating, comment)
    if (res.success) {
      toast.success('Review posted successfully')
      // Optionally, close the sheet/dialog here
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="my-4 flex flex-col gap-y-2">
      <h5 className="">Leave you review</h5>
      <form onSubmit={onSubmit} className="space-y-3">
        <div
          style={{
            direction: 'ltr',
            fontFamily: 'sans-serif',
            touchAction: 'none',
          }}
        >
          <Rating
            allowFraction
            onClick={(rate) => {
              setRating(rate)
            }}
            transition
            size={24}
          />
        </div>

        <Textarea
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {userAuth ? (
          <Button type="submit" disabled={!rating}>
            Submit Review
          </Button>
        ) : (
          <RedirectToLoginButton
            toastMessage="You must be logged in to post a review"
            btnText="Post Review"
          />
        )}
      </form>
    </div>
  )
}
