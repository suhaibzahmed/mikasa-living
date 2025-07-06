'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const VerifyOtpPage = () => {
  const router = useRouter()

  const handleOtpChange = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success('OTP verified successfully!')
    router.push('/')
  }

  return (
    <div className="flex flex-col gap-y-4 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the OTP sent to your mobile number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <Button type="submit" className="w-full" onClick={handleOtpChange}>
          Verify OTP
        </Button>
      </Card>
    </div>
  )
}

export default VerifyOtpPage
