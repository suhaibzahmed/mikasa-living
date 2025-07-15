import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BusinessDetails from '../../_components/BusinessDetails'
import Portfolio from '../../_components/Portfolio'
import AvailabilityComponent from '../../_components/Availability'
import { getCompleteVendorDetails } from '@/actions/vendor/fetch.actions'
import VerificationPending from '../../_components/VerificationPending'

const VendorProfilePage = async () => {
  const vendorDetails = await getCompleteVendorDetails()

  return (
    <div>
      <Tabs defaultValue="details" className="">
        <TabsList>
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <BusinessDetails vendorDetails={vendorDetails} />
        </TabsContent>
        <TabsContent value="portfolio">
          {vendorDetails?.verificationStatus === 'PENDING' ? (
            <VerificationPending />
          ) : (
            <Portfolio vendor={vendorDetails} />
          )}
        </TabsContent>
        <TabsContent value="availability">
          {vendorDetails?.verificationStatus === 'PENDING' ? (
            <VerificationPending />
          ) : (
            <AvailabilityComponent vendor={vendorDetails} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default VendorProfilePage
