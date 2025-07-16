import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUsers } from '@/actions/admin/fetch.actions'

const RecentUsers = async () => {
  const users = await getUsers({})
  const fiveUsers = users.data.users.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users Joined</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {users.data.users.length < 1 ? (
          <p>No users joined yet</p>
        ) : (
          fiveUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src={'src="https://github.com/shadcn.png"'}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div>
                <Button asChild variant="outline">
                  <Link href={`/admin/user-management/${user.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
        <Button asChild className="mt-4 w-full">
          <Link href="/admin/user-management">View All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentUsers
