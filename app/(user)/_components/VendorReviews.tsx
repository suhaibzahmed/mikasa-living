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

type VendorReviewsProps = {
  reviews: (Review & { user: User | null })[]
  hasReviewed: boolean
  vendorId: string
}

const VendorReviews = ({
  reviews,
  hasReviewed,
  vendorId,
}: VendorReviewsProps) => {
  return (
    <div>
      <h5>Reviews</h5>
      {!hasReviewed && <PostReviewForm vendorId={vendorId} />}
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
