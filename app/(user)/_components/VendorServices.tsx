import { getVendorServices } from '@/actions/common.actions'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const VendorServices = async ({ vendorId }: { vendorId: string }) => {
  const vendor = await getVendorServices(vendorId)
  return (
    <div>
      <h5>Services Provided</h5>
      {vendor?.services && vendor.services.length < 1 ? (
        <p>No services found</p>
      ) : (
        <div className="grid w-full grid-cols-3 gap-4">
          {vendor?.services.map((service) => (
            <Card key={service} className="min-w-0">
              <CardHeader>
                <CardTitle>{service}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
export default VendorServices
