import { HomeIcon, LayoutDashboard, Store, Users } from 'lucide-react'

export const adminSidebarMenus = [
  {
    id: 1,
    name: 'Mikasa Living',
    icon: HomeIcon,
    href: '/admin/dashboard',
  },
  {
    id: 2,
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    id: 3,
    name: 'Vendors',
    icon: Store,
    href: '/admin/vendors',
  },
  {
    id: 4,
    name: 'Users',
    icon: Users,
    href: '/admin/users',
  },
]
