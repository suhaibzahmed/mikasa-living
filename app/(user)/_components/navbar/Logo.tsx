import { House } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-x-2">
        <House className="size-5" />
        <h5>Mikasa Living</h5>
      </Link>
    </div>
  )
}
export default Logo
