'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import {
  adminSidebarMenus,
  adminNavUserItems,
  vendorSidebarMenus,
  vendorNavUserItems,
  userSidebarMenus,
  userNavUserItems,
} from '@/constants/sidebarMenus'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, HomeIcon, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSidebar } from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import { getVendorDetails } from '@/actions/vendor/fetch.actions'
import { logout } from '@/actions/vendor/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Vendor } from '@prisma/client'

type Role = 'admin' | 'vendor' | 'user'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: Role
}

const AppSidebar = ({ role, ...props }: AppSidebarProps) => {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [vendor, setVendor] = useState<Partial<Vendor>>({
    companyName: 'Vendor Name',
    email: 'vendor@example.com',
  })

  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (role === 'vendor') {
        const res = await getVendorDetails()
        if (res.success && res.data) {
          setVendor(res.data)
        }
      }
    }
    fetchVendorDetails()
  }, [role])

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    router.push('/vendor/sign-in')
  }

  const user = {
    name: 'User Name',
    email: 'user@example.com',
    image: '/avatars/shadcn.jpg',
  }

  const menuItems =
    role === 'admin'
      ? adminSidebarMenus
      : role === 'vendor'
      ? vendorSidebarMenus
      : userSidebarMenus

  const navUserItems =
    role === 'admin'
      ? adminNavUserItems
      : role === 'vendor'
      ? vendorNavUserItems
      : userNavUserItems

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <HomeIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=closed]:hidden">
                <h5 className="truncate font-medium">Mikasa Living</h5>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((menu) => (
              <SidebarMenuItem key={menu.id}>
                <SidebarMenuButton asChild>
                  <Link href={menu.href}>
                    <menu.icon />
                    <span className="group-data-[state=closed]:hidden">
                      {menu.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {role === 'vendor' ? vendor.companyName : user.name}
                    </span>
                    <span className="truncate text-xs">
                      {role === 'vendor' ? vendor.email : user.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {role === 'vendor' ? vendor.companyName : user.name}
                      </span>
                      <span className="truncate text-xs">
                        {role === 'vendor' ? vendor.email : user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {navUserItems.map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
