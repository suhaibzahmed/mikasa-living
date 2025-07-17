import { Review, User } from '@prisma/client'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PostReviewForm } from './PostReviewForm'
import { DecodedIdToken } from 'firebase-admin/auth'

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
  return (
    <div>
      <h5>Reviews</h5>
      {!hasReviewed && (
        <PostReviewForm vendorId={vendorId} userAuth={userAuth} />
      )}
      {reviews.length < 1 ? (
        <p>No reviews found</p>
      ) : (
        <div className="grid gir-cols-1 gap-4">
          {reviews.map((review) => {
            return (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle>{review?.user?.name}</CardTitle>
                  <CardDescription>{review.comment}</CardDescription>
                  <CardAction>{review.rating}/5</CardAction>
                </CardHeader>

                <CardFooter className="text-gray-400 text-sm">
                  {review.createdAt.toLocaleDateString()}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default VendorReviews
