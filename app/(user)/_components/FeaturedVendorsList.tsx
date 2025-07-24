import SingleVendorCard from '@/components/SingleVendorCard'
import { Plan, Review, Vendor, Featured, Availability } from '@prisma/client'

type FeaturedVendorsListProps = {
  featuredVendors: (Vendor & {
    plan: Plan
    reviews: Review[]
    featured: Featured | null
    availability: Availability | null
  })[]
}

const FeaturedVendorsList = ({ featuredVendors }: FeaturedVendorsListProps) => {
  return (
    <div className="my-8">
      {featuredVendors.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No featured vendors found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {featuredVendors.map((vendor) => (
            <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
          ))}
        </div>
      )}
    </div>
  )
}
export default FeaturedVendorsList
