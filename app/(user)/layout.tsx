import Navbar from './_components/navbar/Navbar'

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main>
      <Navbar />
      <div className="container sm:px-6 lg:px-8 mx-auto">{children}</div>
    </main>
  )
}
export default UserLayout
