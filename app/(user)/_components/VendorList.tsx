import { Plan, Review, Vendor } from '@prisma/client'
import SingleVendorCard from '@/components/SingleVendorCard'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { VENDOR_PAGE_SIZE } from '@/constants/config'

type VendorListProps = {
  vendors: (Vendor & { plan: Plan; reviews: Review[] })[]
  totalPages: number
}

const VendorList = ({ vendors, totalPages }: VendorListProps) => {
  return (
    <div className="flex-1">
      {vendors.length === 0 ? (
        <p>No vendors found</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
          ))}
        </div>
      )}
      <div className="mt-8">
        <PaginationWithLinks
          pageSize={VENDOR_PAGE_SIZE}
          page={1}
          totalCount={totalPages * VENDOR_PAGE_SIZE}
        />
      </div>
    </div>
  )
}
export default VendorList
