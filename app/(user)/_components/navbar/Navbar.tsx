import ThemeToggle from '@/components/ThemeToggle'
import CitySelect from './CitySelect'
import Logo from './Logo'
import SearchVendors from './SearchVendors'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = async () => {
  return (
    <nav className="sticky top-0 z-50 py-4 border-b bg-background">
      <div className="container sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-x-8">
        <Logo />
        <CitySelect />
        <SearchVendors />

        <div>
          <Link
            href="/vendor/sign-in"
            className={buttonVariants({ variant: 'outline' })}
          >
            For Vendors
          </Link>
          <Button asChild>
            <Link href="/user/sign-in">Login / Register</Link>
          </Button>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  )
}
export default Navbar
