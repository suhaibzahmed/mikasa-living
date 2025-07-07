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
import { adminSidebarMenus } from '@/constants/adminSidebarMenus'
import Link from 'next/link'
import NavUser from './NavUser'

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const sidebarHeader = adminSidebarMenus[0]

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
                <sidebarHeader.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=closed]:hidden">
                <h5 className="truncate font-medium">{sidebarHeader.name}</h5>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {adminSidebarMenus.slice(1).map((menu) => (
              <SidebarMenuItem key={menu.id}>
                {menu.icon && (
                  <SidebarMenuButton asChild>
                    <Link href={menu.href}>
                      <menu.icon />
                      <span className="group-data-[state=closed]:hidden">
                        {menu.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}
                {!menu.icon && menu.name}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default AdminSidebar
