import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-x-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center border">
          <h5>M</h5>
        </div>
        <h4>Mikasa Living</h4>
      </Link>
    </div>
  )
}
export default Logo
