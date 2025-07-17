import { getFeaturedVendors } from '@/actions/common.actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SingleVendorCard from '@/components/SingleVendorCard'

const FeaturedVendors = async () => {
  const featuredVendors = await getFeaturedVendors()

  return (
    <div>
      {featuredVendors.data && featuredVendors.data.length < 1 ? (
        <p>No featured vendors</p>
      ) : (
        <div className="space-y-4">
          <div className="grid w-full grid-cols-4 gap-4">
            {featuredVendors.data?.map((vendor) => (
              <SingleVendorCard key={vendor.id} vendorDetails={vendor.vendor} />
            ))}
          </div>
          <Button asChild>
            <Link href="/vendors">View All</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
export default FeaturedVendors
