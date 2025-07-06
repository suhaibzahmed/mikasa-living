import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

const FormSubmitButton = ({
  isPending,
  title,
  pendingText,
  variant = 'default',
  className,
}: {
  isPending: boolean
  title: string
  pendingText: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  className?: string
}) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      variant={variant}
      className={className}
    >
      {isPending ? (
        <>
          <LoaderCircle className="animate-spin" /> {pendingText}
        </>
      ) : (
        title
      )}
    </Button>
  )
}
export default FormSubmitButton
