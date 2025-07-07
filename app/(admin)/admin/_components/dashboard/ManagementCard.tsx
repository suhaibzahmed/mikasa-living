import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ManagementCardProps {
  title: string
  icon: LucideIcon
  href: string
}

const ManagementCard = ({ title, icon: Icon, href }: ManagementCardProps) => {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
      </Card>
    </Link>
  )
}

export default ManagementCard
