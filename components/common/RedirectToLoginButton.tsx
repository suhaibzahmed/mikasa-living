'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { toast } from 'sonner'

type RedirectToLoginButtonProps = {
  toastMessage: string
  btnText: string
}

const RedirectToLoginButton = ({
  toastMessage,
  btnText,
}: RedirectToLoginButtonProps) => {
  const router = useRouter()

  const handleRedirect = () => {
    toast.error(toastMessage)
    return router.push('/user/sign-in')
  }

  return (
    <Button className="w-full" onClick={handleRedirect}>
      {btnText}
    </Button>
  )
}
export default RedirectToLoginButton
