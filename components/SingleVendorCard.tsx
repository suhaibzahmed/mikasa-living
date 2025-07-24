import { Plan, Review, Vendor } from '@prisma/client'
import { Button } from './ui/button'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge } from './ui/badge'

const SingleVendorCard = async ({
  vendorDetails,
}: {
  vendorDetails: Vendor & { plan: Plan; reviews: Review[] }
}) => {
  const { companyName, description, plan, id, reviews } = vendorDetails

  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-card text-card-foreground border relative">
      {/* <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[rgba(17,17,17,0.9)] via-[rgb(17,17,17,0.4)] to-[rgb(17,17,17,0.2)] z-10 "></div> */}
      <div className="relative h-48 w-full top-0">
        {/* <Image
          src={HeroImg || ''}
          alt={companyName}
          fill
          className="object-cover "
        /> */}
      </div>
      <div className="p-6 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="truncate">{companyName}</h5>
          <Badge variant="outline">{plan.type}</Badge>
        </div>
        <p className="text-muted-foreground  ">
          {description && description?.length > 100
            ? description?.substring(0, 100) + '...'
            : description || 'No description available.'}
        </p>
        <div className="flex items-center ">
          <Star className="w-4 h-4 text-primary mr-1" fill="#f3c018" />
          <span className=" font-medium">{averageRating.toFixed(1)}</span>
          <span className=" text-muted-foreground ml-1">
            ({totalReviews} reviews)
          </span>
        </div>

        <div className="flex flex-col gap-y-4 w-full items-center ">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/vendor/${id}`}>View Profile</Link>
          </Button>

          <Button asChild className="w-full">
            <Link href={`/vendor/${id}`}>Book Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SingleVendorCard
