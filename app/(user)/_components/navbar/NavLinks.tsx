'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navlinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Vendors', href: '/vendors' },
]

const NavLinks = () => {
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-x-6">
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
  )
}
export default NavLinks
