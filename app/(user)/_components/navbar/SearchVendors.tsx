import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchVendors = () => {
  return (
    <div className="flex-1">
      <form className="relative">
        <Input placeholder="Search for vendors..." />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </form>
    </div>
  )
}
export default SearchVendors
