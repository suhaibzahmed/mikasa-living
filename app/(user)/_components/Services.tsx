import { vendorServices } from '@/constants/user.constants'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Services = () => {
  return (
    <div>
      <div className="grid w-full grid-cols-3 gap-4">
        {vendorServices.map((service) => (
          <Card key={service.slug} className="min-w-0">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
              <CardAction>
                <service.icon />
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Button asChild className="mt-4 ">
          <Link href="/services">View All</Link>
        </Button>
      </div>
    </div>
  )
}
export default Services
