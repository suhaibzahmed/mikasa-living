'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import RenderSteps from './_components/RenderSteps'

const UserSignUpPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>User Registration</h4>
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create new account</CardTitle>
            <CardDescription>
              Enter your details to create account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RenderSteps />
            <div className=" text-center text-sm mt-4">
              Already have an account?{' '}
              <Link
                href="/user/sign-in"
                className="underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserSignUpPage
