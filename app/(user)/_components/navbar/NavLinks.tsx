'use client'

import { Button } from '@/components/ui/button'
import { navlinks } from '@/constants/user.constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex gap-x-2">
      {navlinks.map((link) => (
        <Button
          key={link.name}
          asChild
          variant="link"
          className={
            pathname.substring(1) === link.href
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
