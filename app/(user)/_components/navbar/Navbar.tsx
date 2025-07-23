'use client'

import ThemeToggle from '@/components/ThemeToggle'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import NavLinks from './NavLinks'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { navlinks } from '@/constants/user.constants'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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
      <MaxWidthWrapper>
        <div className=" sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-x-4 ">
          <Logo />

          <div className="flex items-center gap-x-4">
            <NavLinks />

            <div className="hidden lg:flex items-center gap-x-4">
              <Button asChild variant="outline">
                <Link href="/vendor/sign-in">For Vendors</Link>
              </Button>
              <Button asChild>
                <Link href="/user/sign-in">Login / Register</Link>
              </Button>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-center lg:hidden">
              <Sheet>
                <SheetTrigger className=" " asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-6 text-primary" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                    <SheetDescription className=" my-6 flex flex-col gap-y-4">
                      <div className=" flex flex-col gap-y-4 md:hidden">
                        {navlinks.map((link) => (
                          <Button
                            key={link.name}
                            asChild
                            variant="link"
                            className={
                              pathname === link.href
                                ? 'text-primary underline underline-offset-4'
                                : 'text-white'
                            }
                          >
                            <Link href={link.href}>{link.name}</Link>
                          </Button>
                        ))}
                      </div>
                      <Button className="w-full" variant="outline">
                        <Link href="/vendor/sign-in">For Vendors</Link>
                      </Button>
                      <Button className="w-full">
                        <Link href="/vendor/sign-in">Login / Register</Link>
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
export default Navbar
