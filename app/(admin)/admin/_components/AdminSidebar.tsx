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
import { adminSidebarMenus, adminNavUserItems } from '@/constants/sidebarMenus'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getAdmin, logout } from '@/actions/admin/actions'
import { Admin } from '@prisma/client'
import { useEffect, useState } from 'react'

const AdminSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [admin, setAdmin] = useState<Partial<Admin>>({
    email: 'admin@example.com',
  })

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const res = await getAdmin()
      if (res) {
        setAdmin(res)
      }
    }
    fetchAdminDetails()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/admin/sign-in')
    toast.success('Logged out successfully')
  }

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
            {adminSidebarMenus.map((menu) => (
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
                      alt={admin.email?.charAt(0).toUpperCase()}
                    />
                    <AvatarFallback className="rounded-lg">A</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Admin</span>
                    <span className="truncate text-xs">{admin.email}</span>
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
                        alt={admin.email?.charAt(0).toUpperCase()}
                      />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Admin</span>
                      <span className="truncate text-xs">{admin.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {adminNavUserItems.map((item) => (
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
export default AdminSidebar
