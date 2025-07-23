import Navbar from './_components/navbar/Navbar'

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
export default UserLayout
