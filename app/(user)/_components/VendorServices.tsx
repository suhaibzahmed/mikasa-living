import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Service } from '@prisma/client'

const VendorServices = ({ services }: { services: Service[] }) => {
  return (
    <div>
      {services.length < 1 ? (
        <p>No services found</p>
      ) : (
        <div className="grid w-full grid-cols-3 gap-4">
          {services.map((service) => (
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
