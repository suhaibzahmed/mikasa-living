import { getVendorById } from '@/actions/admin/fetch.actions'
import VendorDetails from '../../_components/vendors/VendorDetails'

const VendorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const vendorResponse = await getVendorById(id)

  if (!vendorResponse.success || !vendorResponse.data) {
    return <div>Vendor not found</div>
  }

  return <VendorDetails vendor={vendorResponse.data} />
}

export default VendorDetailsPage
