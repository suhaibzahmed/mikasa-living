import SingleVendorCard from '@/components/SingleVendorCard'
import { Plan, Review, Vendor, Featured, Availability } from '@prisma/client'

type VendorType = Vendor & {
  plan: Plan
  reviews: Review[]
  featured: Featured | null
  availability: Availability | null
}

type FeaturedVendorsListProps = {
  featuredVendors: VendorType[]
  nonFeaturedVendors: VendorType[]
}

const FeaturedVendorsList = ({
  featuredVendors,
  nonFeaturedVendors,
}: FeaturedVendorsListProps) => {
  const vendorsToShow = [...featuredVendors, ...nonFeaturedVendors].slice(0, 3)

  return (
    <div className="my-8">
      {vendorsToShow.length === 0 ? (
        <p className="text-center text-muted-foreground">No vendors found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {vendorsToShow.map((vendor) => (
            <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
          ))}
        </div>
      )}
    </div>
  )
}
export default FeaturedVendorsList
