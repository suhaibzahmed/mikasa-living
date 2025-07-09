import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getPendingVendors } from '@/actions/admin/fetch.actions'

const PendingVendors = async () => {
  const pendingVendors = await getPendingVendors()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Vendor Approvals</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {pendingVendors.data.map((vendor) => (
          <div key={vendor.id} className="flex items-center justify-between">
            <div className="flex gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src={
                    vendor.profileImage || 'src="https://github.com/shadcn.png"'
                  }
                  alt={vendor.companyName}
                />
                <AvatarFallback>
                  {vendor.companyName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {vendor.companyName}
                </p>
                <p className="text-sm text-muted-foreground">{vendor.email}</p>
              </div>
            </div>
            <div>
              <Button asChild variant="outline">
                <Link href={`/admin/vendor-management/${vendor.id}`}>
                  Review
                </Link>
              </Button>
            </div>
          </div>
        ))}
        <Button asChild className="mt-4 w-full">
          <Link href="/admin/vendor-management">View All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default PendingVendors
