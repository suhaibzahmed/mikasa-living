import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import { getServicesWithVendors } from '@/actions/user/fetch.actions'
import SingleVendorCard from '@/components/SingleVendorCard'

const Services = async () => {
  const services = await getServicesWithVendors()

  return (
    <div id="services">
      <SectionTitle title="Our Services" />

      <section className="flex flex-col gap-y-12">
        <h2 className="text-white font-medium">
          We Offer a Wide Range of Services to Meet Your Needs
        </h2>
        {services.map((service) => (
          <div key={service.id} className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{service.name}</h2>
              <Button asChild>
                <Link href={`/services/${service.slug}`}>View All</Link>
              </Button>
            </div>

            {service.featuredVendors.length > 0 && (
              <div>
                <h3 className="text-xl font-medium">Featured Vendors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {service.featuredVendors.map((vendor) => (
                    <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
                  ))}
                </div>
              </div>
            )}

            {service.nonFeaturedVendors.length > 0 && (
              <div>
                <h3 className="text-xl font-medium">Other Vendors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {service.nonFeaturedVendors.map((vendor) => (
                    <SingleVendorCard key={vendor.id} vendorDetails={vendor} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
export default Services
