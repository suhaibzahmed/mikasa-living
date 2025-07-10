import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

const VerificationPending = () => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Reviewing you account</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          <li>Admin is reviewing you account.</li>
          <li>It takes about 2-3 hours</li>
          <li>You can proceed once your account is verified.</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
export default VerificationPending
