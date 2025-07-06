import Logo from '@/app/(user)/_components/navbar/Logo'
import ThemeToggle from '../../../components/ThemeToggle'

const AuthNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-4 border-b bg-background">
      <div className="container sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-x-8">
        <Logo />
        <ThemeToggle />
      </div>
    </nav>
  )
}
export default AuthNavbar
