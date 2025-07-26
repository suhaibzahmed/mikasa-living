'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/utils/formatDate'
import { Review, User } from '@prisma/client'
import { Rating } from 'react-simple-star-rating'

type SingleVendorReviewCardProps = {
  review: Review & { user: User | null }
}

const SingleVendorReviewCard = ({ review }: SingleVendorReviewCardProps) => {
  const { user } = review
  console.log('🚀 ~ SingleVendorReviewCard ~ review:', review)

  return (
    <div className="my-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="capitalize font-medium">{user?.name}</p>
            <span className="text-muted-foreground text-xs">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
        <div
          style={{
            direction: 'ltr',
            fontFamily: 'sans-serif',
            touchAction: 'none',
          }}
        >
          <Rating
            initialValue={review.rating || 0}
            onClick={function noRefCheck() {}}
            readonly
            size={24}
            // allowFraction
            fillColor="#ffb400"
            style={{ color: '#ffb400' }}
          />
        </div>
      </div>

      <div>
        <p>{review.comment}</p>
      </div>

      <Separator />
    </div>
  )
}
export default SingleVendorReviewCard
