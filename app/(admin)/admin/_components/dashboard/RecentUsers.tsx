import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const recentUsers = [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@example.com',
    image: '',
  },
  {
    id: '2',
    name: 'User 2',
    email: 'user2@example.com',
    image: '',
  },
  {
    id: '3',
    name: 'User 3',
    email: 'user3@example.com',
    image: '',
  },
  {
    id: '4',
    name: 'User 4',
    email: 'user4@example.com',
    image: '',
  },
  {
    id: '5',
    name: 'User 5',
    email: 'user5@example.com',
    image: '',
  },
]

const RecentUsers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent User Registrations</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {recentUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
        <Button asChild className="mt-4 w-full">
          <Link href="/admin/user-management">View All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentUsers
