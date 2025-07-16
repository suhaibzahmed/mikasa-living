import { getFeaturedVendors } from '@/actions/user/fetch.actions'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const FeaturedVendors = async () => {
  const featuredVendors = await getFeaturedVendors()

  return (
    <div>
      {featuredVendors.data && featuredVendors.data.length < 1 ? (
        <p>No featured vendors</p>
      ) : (
        <div className="grid w-full grid-cols-3 gap-4">
          {featuredVendors.data?.map((vendor) => (
            <Card key={vendor.id} className="min-w-0">
              <div>
                <Avatar>
                  <AvatarFallback>
                    {vendor.companyName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardHeader>
                <CardTitle>{vendor.companyName}</CardTitle>
                <CardDescription>{}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
export default FeaturedVendors
