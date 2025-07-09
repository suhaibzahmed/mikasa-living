import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import ThemeToggle from '@/components/ThemeToggle'
import UserSidebar from './_components/UserSidebar'
import { redirect } from 'next/navigation'
import { checkUserAuth } from '@/actions/checkAuth'

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const user = await checkUserAuth()
  if (!user) {
    redirect('/user/sign-in')
  }

  return (
    <main className="min-h-svh flex">
      <SidebarProvider>
        <UserSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
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
export default UserLayout
