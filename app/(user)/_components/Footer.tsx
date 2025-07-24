import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Logo from './navbar/Logo'
import { navlinks } from '@/constants/user.constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <div className="bg-black relative py-8">
      <MaxWidthWrapper>
        <div>
          <Logo />

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex gap-x-4 my-8">
              {navlinks.map((link) => (
                <Button
                  key={link.name}
                  asChild
                  variant="link"
                  className="text-white"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-x-4">
              <Button asChild variant="secondary" size="lg">
                <Link href="/vendor/sign-in">For Vendors</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/user/sign-in">Login / Register</Link>
              </Button>
            </div>
          </div>

          <Separator className="w-full my-8" />

          <div className="flex flex-col md:flex-row gap-y-2 items-center justify-between">
            <p className="text-muted-foreground">
              Copyright © 2023 Mikasa Living. All rights reserved.
            </p>
            <div>
              <Button asChild variant="link" className="text-muted-foreground">
                <Link href="#">Terms</Link>
              </Button>
              <Button asChild variant="link" className="text-muted-foreground">
                <Link href="#">Privacy</Link>
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
export default Footer
