import Link from 'next/link'
import { Button } from '../ui/button'

const NotFound = ({
  Icon,
  title,
  redirectLink,
  redirectText,
}: {
  Icon: React.ComponentType<{ className?: string }>
  title: string
  redirectLink?: string
  redirectText?: string
}) => {
  return (
    <div className="min-h-[calc(100vh-300px)] flex flex-col items-center justify-center gap-y-4">
      <Icon className=" size-32 text-muted-foreground/30" />
      <h4 className="text-muted-foreground/30">{title}</h4>
      {redirectLink && (
        <Button asChild>
          <Link href={redirectLink}>{redirectText}</Link>
        </Button>
      )}
    </div>
  )
}
export default NotFound
