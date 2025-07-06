import AuthNavbar from './_components/AuthNavbar'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main>
      <AuthNavbar />
      <div className="container sm:px-6 lg:px-8 mx-auto ">{children}</div>
    </main>
  )
}
export default AuthLayout
