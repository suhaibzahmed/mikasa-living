import SingleVendorCard from '@/components/SingleVendorCard'
import { Plan, Review, Vendor } from '@prisma/client'

type AllVendorsListProps = {
  vendors: (Vendor & {
    plan: Plan
    reviews: Review[]
  })[]
}

const AllVendorsList = ({ vendors }: AllVendorsListProps) => {
  return (
    <div className="my-8">
      {vendors.length === 0 ? (
        <p className="text-center text-muted-foreground">No vendors found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {vendors.map((vendor) => (
            <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
          ))}
        </div>
      )}
    </div>
  )
}
export default AllVendorsList
