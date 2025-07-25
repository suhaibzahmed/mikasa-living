import SingleVendorCard from '@/components/SingleVendorCard'
import { Button } from '@/components/ui/button'
import { Availability, Featured, Plan, Review, Vendor } from '@prisma/client'

type AllVendorsListProps = {
  vendors: (Vendor & {
    plan: Plan
    reviews: Review[]
    featured: Featured | null
    availability: Availability | null
  })[]
  service: string
}

const AllVendorsList = ({ vendors, service }: AllVendorsListProps) => {
  return (
    <div className="my-8">
      {vendors.length === 0 ? (
        <p className="text-center text-muted-foreground">No vendors found</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {vendors.map((vendor) => (
              <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
            ))}
          </div>
          <div className="w-full flex justify-center my-6">
            <Button variant="secondary">View All Vendors in {service}</Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AllVendorsList
