import SectionTitle from './SectionTitle'
import { getServicesWithVendors } from '@/actions/user/fetch.actions'
import { Suspense } from 'react'
import FeaturedVendorsList from './FeaturedVendorsList'

const Services = async () => {
  const services = await getServicesWithVendors()

  return (
    <div id="services" className="my-40">
      <SectionTitle title="Our Services" />

      <section>
        <h2 className="text-white font-medium">
          We Offer a Wide Range of Services to Meet Your Needs
        </h2>

        <div className="my-16 flex flex-col gap-y-20 ">
          {services.map((service) => (
            <div key={service.id} className=" flex flex-col ">
              <h2 className=" decoration-primary text-center ">
                {service.name}
              </h2>

              <div>
                {/* <div className="w-full flex justify-center items-center">
                  <Badge
                    variant="outline"
                    className="text-base gap-x-2 flex items-center"
                  >
                    <Crown className="text-primary scale-150" fill="#f3c018" />
                    Featured Vendors
                  </Badge>
                </div> */}

                <Suspense fallback={<div>Loading...</div>}>
                  <FeaturedVendorsList
                    featuredVendors={service.featuredVendors}
                    nonFeaturedVendors={service.nonFeaturedVendors}
                    service={service.name}
                    slug={service.slug}
                  />
                </Suspense>
              </div>

              {/* <div>
                <div className="w-full flex justify-center items-center">
                  <Badge variant="outline" className="text-base">
                    All Vendors
                  </Badge>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                  <AllVendorsList
                    vendors={service.nonFeaturedVendors}
                    service={service.name}
                  />
                </Suspense>
              </div> */}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export default Services
