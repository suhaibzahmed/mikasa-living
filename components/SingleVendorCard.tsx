import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plan, Review, Vendor } from '@prisma/client'
import { Button } from './ui/button'
import Link from 'next/link'

const SingleVendorCard = async ({
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

      <div className="flex justify-center w-full">
        <Button asChild>
          <Link href={`/vendor/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  )
}
export default SingleVendorCard
