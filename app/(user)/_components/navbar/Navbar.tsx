'use client'

import ThemeToggle from '@/components/ThemeToggle'
import CitySelect from './CitySelect'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import NavLinks from './NavLinks'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        {
          'border-b bg-background': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="container sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-x-8">
        <Logo />

        <div>
          <NavLinks />
        </div>

        <div className="flex items-center gap-x-4">
          <CitySelect />
          <Button asChild variant="outline">
            <Link href="/vendor/sign-in">For Vendors</Link>
          </Button>
          <Button asChild>
            <Link href="/user/sign-in">Login / Register</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
