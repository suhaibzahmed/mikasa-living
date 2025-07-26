import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Plan, Vendor, Review, Availability } from '@prisma/client'
import { Star } from 'lucide-react'
import BookConsultationButton from './BookConsultationButton'

type VendorProfileHeaderProps = {
  vendor: Vendor & {
    plan: Plan
    reviews: Review[]
    availability: Availability | null
  }
  averageRating: number
  totalReviews: number
}

const VendorProfileHeader = ({
  vendor,
  averageRating,
  totalReviews,
}: VendorProfileHeaderProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage
            src={vendor.profileImage || ''}
            alt={vendor.companyName}
          />
          <AvatarFallback className="text-3xl">
            {vendor.companyName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-x-3">
            <h1 className="text-3xl font-bold">{vendor.companyName}</h1>
            <Badge className="capitalize">
              {vendor.plan.type.toLowerCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-x-4 text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Star className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="font-semibold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <span>({totalReviews} reviews)</span>
            </div>
            {/* Location can be added here if available */}
          </div>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <BookConsultationButton vendorDetails={vendor} />
      </div>
    </div>
  )
}

export default VendorProfileHeader
