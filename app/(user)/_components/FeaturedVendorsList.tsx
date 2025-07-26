import SingleVendorCard from '@/components/SingleVendorCard'
import { Button } from '@/components/ui/button'
import { Plan, Review, Vendor, Featured, Availability } from '@prisma/client'
import Link from 'next/link'

type VendorType = Vendor & {
  plan: Plan
  reviews: Review[]
  featured: Featured | null
  availability: Availability | null
}

type FeaturedVendorsListProps = {
  featuredVendors: VendorType[]
  nonFeaturedVendors: VendorType[]
  service: string
  slug: string
}

const FeaturedVendorsList = ({
  featuredVendors,
  nonFeaturedVendors,
  service,
  slug,
}: FeaturedVendorsListProps) => {
  const vendorsToShow = [...featuredVendors, ...nonFeaturedVendors].slice(0, 3)

  return (
    <div className="my-8">
      {vendorsToShow.length === 0 ? (
        <p className="text-center text-muted-foreground">No vendors found</p>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {vendorsToShow.map((vendor) => (
              <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
            ))}
          </div>
          <div className="w-full flex justify-center my-6">
            <Button variant="secondary" asChild>
              <Link href={`/view/vendors?service=${slug}`}>
                View all vendors in {service}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default FeaturedVendorsList
