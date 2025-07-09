import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { User } from '@prisma/client'

type VendorDetailsProps = {
  user: User
}

const UserDetails = ({ user }: VendorDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>

        <CardDescription>User Details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-900">Phone:</span>{' '}
                {user.phone}
              </p>
              <p>
                <span className="font-medium text-gray-900">Email:</span>{' '}
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetails
