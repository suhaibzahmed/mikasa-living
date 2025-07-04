import ThemeToggle from '@/components/ThemeToggle'
import CitySelect from './CitySelect'
import Logo from './Logo'
import SearchVendors from './SearchVendors'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-4 border-b">
      <div className="container sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-x-8">
        <Logo />
        <CitySelect />
        <SearchVendors />
        <Link
          href="/vendor/sign-in"
          className={buttonVariants({ variant: 'outline' })}
        >
          For Vendors
        </Link>
        <Button>Login/Register</Button>
        <ThemeToggle />
      </div>
    </nav>
  )
}
export default Navbar
