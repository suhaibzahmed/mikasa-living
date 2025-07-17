import { Review } from '@prisma/client'

type VendorReviewsProps = {
  reviews: Review[]
}

const VendorReviews = ({ reviews }: VendorReviewsProps) => {
  return <div>VendorReviews</div>
}
export default VendorReviews
