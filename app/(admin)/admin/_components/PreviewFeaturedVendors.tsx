import { getFeaturedVendors } from '@/actions/common.actions'
import SingleVendorCard from '@/components/SingleVendorCard'

const PreviewFeaturedVendors = async () => {
  const featuredVendors = await getFeaturedVendors()

  return (
    <div>
      <div>
        <h5>Preview Featured Vendors</h5>
        <p>This is how the featured vendors will appear on the homepage:</p>
      </div>
      {featuredVendors.data && featuredVendors.data.length < 1 ? (
        <p>No featured vendors</p>
      ) : (
        <div className="grid w-full grid-cols-4 gap-4 ">
          {featuredVendors.data?.map((vendor) => (
            <SingleVendorCard key={vendor.id} vendorDetails={vendor.vendor} />
          ))}
        </div>
      )}
    </div>
  )
}
export default PreviewFeaturedVendors
