import { getGoldPlatinumVendors } from '@/actions/admin/fetch.actions'
import FeaturedVendorsInstructions from '../_components/FeaturedVendorsInstructions'
import PreviewFeaturedVendors from '../_components/PreviewFeaturedVendors'
import SelectFeaturedVendors from '../_components/SelectFeaturedVendors'

const AdManagementPage = async () => {
  const goldPlatinumVendors = await getGoldPlatinumVendors()

  return (
    <div className="flex flex-1 flex-col gap-y-10">
      <SelectFeaturedVendors
        goldPlatinumVendors={goldPlatinumVendors.data || []}
      />
      <PreviewFeaturedVendors />
      <FeaturedVendorsInstructions />
    </div>
  )
}
export default AdManagementPage
