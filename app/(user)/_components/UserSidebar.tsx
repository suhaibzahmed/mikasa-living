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
import { userSidebarMenus, userNavUserItems } from '@/constants/sidebarMenus'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, HomeIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSidebar } from '@/components/ui/sidebar'
import { getUserSidebarDetails } from '@/actions/user/actions'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { LogoutButton } from '@/components/common/LogoutButton'

const UserSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { isMobile } = useSidebar()
  const { isLoading } = useAuth()
  const [user, setUser] = useState<{
    name: string
    email: string | null
  } | null>(null)

  useEffect(() => {
    async function userDetails() {
      const res = await getUserSidebarDetails()
      setUser(res)
    }
    userDetails()
  }, [])

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
            {userSidebarMenus.map((menu) => (
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
                      alt={user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {isLoading ? 'loading...' : user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {isLoading ? 'loading...' : user?.email}
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
                        alt={user?.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {isLoading ? 'loading...' : user?.name}
                      </span>
                      <span className="truncate text-xs">
                        {isLoading ? 'loading...' : user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userNavUserItems.map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default UserSidebar
