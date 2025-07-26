import { Card } from '@/components/ui/card'
import { Service } from '@prisma/client'
import { Wrench } from 'lucide-react'

const VendorServices = ({ services }: { services: Service[] }) => {
  return (
    <div className="p-4">
      {services.length < 1 ? (
        <p className="text-muted-foreground text-center">No services found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow"
            >
              <Wrench className="h-8 w-8 text-primary" />
              <p className="font-semibold text-center">{service.name}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
export default VendorServices
