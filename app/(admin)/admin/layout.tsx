import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AdminSidebar from './_components/sidebar/AdminSidebar'
import { Separator } from '@/components/ui/separator'
import CurrentPageHeader from './_components/sidebar/CurrentPageHeader'
import ThemeToggle from '@/components/ThemeToggle'

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="min-h-svh flex">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <CurrentPageHeader />
            </div>
            <div className="mr-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
export default AdminLayout
