import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

const UserSignInPage = () => {
  return (
    <div className="flex flex-col gap-y-4 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h4>User Sign In</h4>
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your mobile number to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex gap-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="+91" defaultValue="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91 (India)</SelectItem>
                          <SelectItem value="+1">+1 (USA)</SelectItem>
                          <SelectItem value="+44">+44 (UK)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" asChild>
                    <Link href="/user/verify-otp">Get OTP</Link>
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/user/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserSignInPage
