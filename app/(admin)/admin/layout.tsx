import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import ThemeToggle from '@/components/ThemeToggle'
import AdminSidebar from './_components/AdminSidebar'
import CurrentPageHeader from '@/components/common/sidebar/CurrentPageHeader'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/actions/checkAuth'

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const checkAdmin = await getAuthenticatedUser()

  if (!checkAdmin) {
    redirect('/admin/sign-in')
  }

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
