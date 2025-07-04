import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { navbarCities } from '@/constants/navbarCities'

const CitySelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent>
        {navbarCities.map((city) => (
          <SelectItem key={city.id} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default CitySelect
