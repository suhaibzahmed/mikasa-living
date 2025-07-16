import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plan, Review, Vendor } from '@prisma/client'

const SingleFeaturedVendor = async ({
  vendorDetails,
}: {
  vendorDetails: Vendor & { plan: Plan; reviews: Review[] }
}) => {
  const { companyName, email, plan, id } = vendorDetails
  return (
    <Card key={id} className="min-w-0">
      <div>
        <Avatar>
          <AvatarFallback>{companyName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader>
        <CardTitle>{companyName}</CardTitle>
        <CardDescription>
          <p>{email}</p>
          <p>{plan.type}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
export default SingleFeaturedVendor
