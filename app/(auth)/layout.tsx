import AuthNavbar from './_components/AuthNavbar'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="min-h-svh flex flex-col">
      <AuthNavbar />
      <div className="container mx-auto flex-grow flex items-center justify-center">
        {children}
      </div>
    </main>
  )
}
export default AuthLayout
