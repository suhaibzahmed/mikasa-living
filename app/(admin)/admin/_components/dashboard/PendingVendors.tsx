import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const pendingVendors = [
  {
    id: '1',
    name: 'Vendor 1',
    email: 'vendor1@example.com',
    image: '',
  },
  {
    id: '2',
    name: 'Vendor 2',
    email: 'vendor2@example.com',
    image: '',
  },
  {
    id: '3',
    name: 'Vendor 3',
    email: 'vendor3@example.com',
    image: '',
  },
  {
    id: '4',
    name: 'Vendor 4',
    email: 'vendor4@example.com',
    image: '',
  },
  {
    id: '5',
    name: 'Vendor 5',
    email: 'vendor5@example.com',
    image: '',
  },
]

const PendingVendors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Vendor Approvals</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {pendingVendors.map((vendor) => (
          <div key={vendor.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={vendor.image} alt={vendor.name} />
              <AvatarFallback>{vendor.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{vendor.name}</p>
              <p className="text-sm text-muted-foreground">{vendor.email}</p>
            </div>
          </div>
        ))}
        <Button asChild className="mt-4 w-full">
          <Link href="/admin/vendors">View All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default PendingVendors
