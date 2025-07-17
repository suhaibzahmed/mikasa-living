'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SortVendors = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleSortChange} defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="rating">Rating (High to Low)</SelectItem>
        <SelectItem value="reviews">Reviews (High to Low)</SelectItem>
        <SelectItem value="tier">Tier</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortVendors
