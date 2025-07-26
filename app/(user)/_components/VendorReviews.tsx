'use client'

import { Review, User } from '@prisma/client'
import { PostReviewForm } from './PostReviewForm'
import { DecodedIdToken } from 'firebase-admin/auth'
import { Rating } from 'react-simple-star-rating'
import SingleVendorReviewCard from './SingleVendorReviewCard'

type VendorReviewsProps = {
  reviews: (Review & { user: User | null })[]
  hasReviewed: boolean
  vendorId: string
  userAuth: DecodedIdToken | null
}

const VendorReviews = ({
  reviews,
  hasReviewed,
  vendorId,
  userAuth,
}: VendorReviewsProps) => {
  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0

  return (
    <div>
      <div>
        {/* <h5>Reviews</h5> */}
        <div className="flex items-center gap-x-2">
          <h2 className="text-muted-foreground">{averageRating}</h2>
          <div>
            <div
              style={{
                direction: 'ltr',
                fontFamily: 'sans-serif',
                touchAction: 'none',
              }}
            >
              <Rating
                initialValue={averageRating}
                onClick={function noRefCheck() {}}
                readonly
                emptyColor="#ccc"
                size={20}
              />
            </div>
            <p className="text-muted-foreground">({totalReviews} reviews)</p>
          </div>
        </div>
      </div>

      {!hasReviewed && (
        <PostReviewForm vendorId={vendorId} userAuth={userAuth} />
      )}

      {totalReviews === 0 ? (
        <p className="text-muted-foreground text-center my-6">
          No reviews. Be the first to review this vendor!
        </p>
      ) : (
        reviews.map((review) => {
          return <SingleVendorReviewCard key={review.id} review={review} />
        })
      )}
    </div>
  )
}
export default VendorReviews
