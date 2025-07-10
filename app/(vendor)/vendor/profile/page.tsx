import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BusinessDetails from '../../_components/BusinessDetails'
import Portfolio from '../../_components/Portfolio'
import Availability from '../../_components/Availability'
import { getVendorById } from '@/actions/vendor/fetch.actions'

const VendorProfilePage = async () => {
  const vendorDetails = await getVendorById()

  return (
    <div>
      <Tabs defaultValue="details" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <BusinessDetails vendorDetails={vendorDetails} />
        </TabsContent>
        <TabsContent value="portfolio">
          <Portfolio />
        </TabsContent>
        <TabsContent value="availability">
          <Availability />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default VendorProfilePage
