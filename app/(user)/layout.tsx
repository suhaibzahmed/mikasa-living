import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import UserSidebar from './_components/UserSidebar'
import CurrentPageHeader from '@/components/common/sidebar/CurrentPageHeader'
import Navbar from './_components/navbar/Navbar'

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="flex">
      <SidebarProvider>
        <UserSidebar />
        <SidebarInset>
          <Navbar />
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <CurrentPageHeader />
            </div>
          </header>

          <div className=" p-4 pt-0 ">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
export default UserLayout
