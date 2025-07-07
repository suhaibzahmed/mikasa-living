'use client'

import { usePathname } from 'next/navigation'

const CurrentPageHeader = () => {
  const pathname = usePathname()
  const title = pathname.split('/').pop()

  return <h5>{title?.toUpperCase()}</h5>
}
export default CurrentPageHeader
