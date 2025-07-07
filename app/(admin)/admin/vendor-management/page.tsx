import { getVendors } from '@/actions/vendor/fetch.actions'
import VendorTable from '../_components/vendors/VendorTable'

const VendorsPage = async () => {
  const vendorsResponse = await getVendors({})

  const initialVendors = vendorsResponse.success
    ? vendorsResponse.data.vendors
    : []

  return (
    <div className="w-full space-y-4">
      <VendorTable initialVendors={initialVendors} />
    </div>
  )
}

export default VendorsPage
