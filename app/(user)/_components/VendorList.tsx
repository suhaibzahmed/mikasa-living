import SingleVendorCard from '@/components/SingleVendorCard'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { VENDOR_PAGE_SIZE } from '@/constants/config'
import SortVendors from './SortVendors'
import { getAllVendors } from '@/actions/common.actions'

type VendorListProps = {
  sort: string
  service: string | undefined
  page: number
}

const VendorList = async ({ sort, service, page }: VendorListProps) => {
  const vendorData = await getAllVendors({
    page,
    sort,
    service,
  })

  const { totalPages, vendors } = vendorData.data

  return (
    <div className="space-y-4">
      {service && (
        <p>
          Showing vendors in{' '}
          <span className="text-primary font-semibold">
            {service.split('-').join(' ').toUpperCase()}
          </span>
        </p>
      )}
      <div className="flex justify-end">
        <SortVendors />
      </div>

      <div>
        {vendors.length === 0 ? (
          <p>No vendors found</p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  )
}
export default VendorList
