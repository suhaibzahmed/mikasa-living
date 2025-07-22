'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { auth } from '@/lib/firebase/client'
import { useVendorStore } from '@/lib/store/vendorStore'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

const VendorSignIn = () => {
  const router = useRouter()
  const { nextStep, setVendorData } = useVendorStore()

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null)
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [resendCountdown])

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
      }
    )
    setRecaptchaVerifier(recaptchaVerifier)

    return () => {
      recaptchaVerifier.clear()
    }
  }, [auth])

  useEffect(() => {
    const hasEnteredOtp = otp.length === 6
    if (hasEnteredOtp) {
      verifyOtp()
    }
  }, [otp])

  const requestOtp = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setResendCountdown(60)

    startTransition(async () => {
      setError('')
      if (!recaptchaVerifier) {
        setError('recaptchaVerifier is not initialized')
        return
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phone,
          recaptchaVerifier
        )

        setConfirmationResult(confirmationResult)
      } catch (error: any) {
        console.log(error)
        setResendCountdown(0)

        if (error.code === 'auth/invalid-phone-number') {
          setError('Invalid phone number')
        } else if (error.code === 'auth/too-many-requests') {
          setError('Too many requests')
        } else {
          router.push('/vendor/sign-up')
          toast.error('Phone number does not exist. Please sign up.')
        }
      }
    })
  }

  const verifyOtp = async () => {
    startTransition(async () => {
      setError('')
      if (!confirmationResult) {
        setError('Please request otp first')
        return
      }

      try {
        const userCredential = await confirmationResult.confirm(otp)
        const idToken = await userCredential.user.getIdToken()

        await fetch('/api/login', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })

        setVendorData({ phone })
        nextStep()
      } catch (error: any) {
        console.log(error)
        setError('Failed to verify otp')
      }
    })
  }

  return (
    <div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </form>
      )}

      {confirmationResult && (
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}

      <Button
        disabled={!phone || isPending || resendCountdown > 0}
        onClick={() => requestOtp()}
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}`
          : isPending
          ? 'Sending OTP...'
          : 'Send OTP'}
      </Button>

      <p className="text-red-500">{error}</p>

      <div id="recaptcha-container" />
    </div>
  )
}
export default VendorSignIn
