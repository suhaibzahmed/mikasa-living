import {
  LayoutDashboard,
  Store,
  Users,
  Briefcase,
  History,
  User,
  Settings,
  CreditCard,
  Megaphone,
} from 'lucide-react'

export const adminSidebarMenus = [
  {
    id: 1,
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    id: 2,
    name: 'Vendors',
    icon: Store,
    href: '/admin/vendor-management',
  },
  {
    id: 3,
    name: 'Users',
    icon: Users,
    href: '/admin/user-management',
  },
  {
    id: 4,
    name: 'Ads',
    icon: Megaphone,
    href: '/admin/ad-management',
  },
]

export const adminNavUserItems = [
  { id: 1, name: 'Profile', icon: User, href: '/admin/profile' },
  { id: 2, name: 'Settings', icon: Settings, href: '/admin/settings' },
]

export const vendorSidebarMenus = [
  {
    id: 1,
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/vendor/dashboard',
  },
  {
    id: 2,
    name: 'Booking requests',
    icon: Briefcase,
    href: '/vendor/booking-requests',
  },
  {
    id: 3,
    name: 'Confirmed Bookings',
    icon: Briefcase,
    href: '/vendor/confirmed-bookings',
  },
  {
    id: 4,
    name: 'Service history',
    icon: History,
    href: '/vendor/service-history',
  },
]

export const vendorNavUserItems = [
  {
    id: 1,
    name: 'Subscription',
    icon: CreditCard,
    href: '/vendor/subscription',
  },
  { id: 2, name: 'Profile', icon: User, href: '/vendor/profile' },
  { id: 3, name: 'Settings', icon: Settings, href: '/vendor/settings' },
]

export const userSidebarMenus = [
  { id: 1, name: 'Vendors', icon: Store, href: '/vendors' },
  { id: 2, name: 'My Bookings', icon: Briefcase, href: '/my-bookings' },
  { id: 3, name: 'Booking History', icon: History, href: '/booking-history' },
]

export const userNavUserItems = [
  { id: 1, name: 'Profile', icon: User, href: '/profile' },
  { id: 2, name: 'Settings', icon: Settings, href: '/settings' },
]
