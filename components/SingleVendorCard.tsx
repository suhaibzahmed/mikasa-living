import { Availability, Featured, Plan, Review, Vendor } from '@prisma/client'
import { Button } from './ui/button'
import Link from 'next/link'
import { Crown, Star } from 'lucide-react'
import BookConsultationButton from '@/app/(user)/_components/BookConsultationButton'
import Image from 'next/image'
import { Card } from './ui/card'
import { formatTime } from '@/utils/formatTime'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import bedroomImg from '@/public/images/bedroom.jpg'

const SingleVendorCard = async ({
  vendorDetails,
}: {
  vendorDetails: Vendor & {
    plan: Plan
    reviews: Review[]
    availability: Availability | null
    featured: Featured | null
  }
}) => {
  const { reviews, availability, featured } = vendorDetails

  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0
  const startTime = formatTime(availability?.startTime || '')
  const endTime = formatTime(availability?.endTime || '')

  return (
    <Card className="relative h-[500px] w-[380px] overflow-hidden ">
      {featured && (
        <Badge
          variant="secondary"
          className=" gap-x-2 flex items-center absolute top-4 left-4 z-10"
        >
          <Crown className="text-primary scale-125" fill="#f3c018" />
          Featured Vendor
        </Badge>
      )}
      <Image
        src={bedroomImg}
        alt="Bedroom"
        fill
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/40 to-transparent " />
      <div className="absolute flex flex-col gap-y-6 bottom-0 left-0 w-full text-white bg-card/50 p-6 backdrop-blur-md rounded-t-xl">
        <div className="flex justify-between items-center">
          <h5>{vendorDetails.companyName}</h5>
          <CustomBadge className="font-semibold rounded ">
            {vendorDetails.plan.type}
          </CustomBadge>
        </div>

        <p>{vendorDetails.description?.substring(0, 100) + '...'}</p>

        <div className="flex items-center gap-x-2">
          <CustomBadge>
            <Star className="w-4 h-4 text-primary mr-1" fill="currentColor" />
            <span>{averageRating.toFixed(1)}</span>
          </CustomBadge>
          <CustomBadge>{totalReviews} reviews</CustomBadge>
          <CustomBadge>
            {startTime} - {endTime}
          </CustomBadge>
        </div>

        <div className="grid grid-cols-2 gap-x-4 items-center">
          <Button asChild variant="secondary">
            <Link href={`/view/vendor/${vendorDetails.id}`}>View Profile</Link>
          </Button>
          <BookConsultationButton vendorDetails={vendorDetails} />
        </div>
      </div>
    </Card>
  )
}

export default SingleVendorCard

const CustomBadge = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-full bg-white/20 px-3 py-1 text-xs ',
        className
      )}
    >
      {children}
    </div>
  )
}
