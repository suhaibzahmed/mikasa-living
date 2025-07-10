import { getVendorById } from '@/actions/vendor/fetch.actions'
import VerificationPending from './VerificationPending'

const VendorPhotos = async () => {
  const vendor = await getVendorById()

  if (vendor?.verificationStatus !== 'VERIFIED') {
    return <VerificationPending />
  }

  return <div>VendorPhotos</div>
}
export default VendorPhotos
