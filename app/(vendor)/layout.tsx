import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import ThemeToggle from '@/components/ThemeToggle'
import AppSidebar from '@/components/common/sidebar/AppSidebar'
import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
import CurrentPageHeader from '@/components/common/sidebar/CurrentPageHeader'

const VendorLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await verifySession()
  console.log('🚀 ~ session:', session)

  if (!session) {
    redirect('/vendor/sign-in')
  }

  return (
    <main className="min-h-svh flex">
      <SidebarProvider>
        <AppSidebar role="vendor" />
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
export default VendorLayout
