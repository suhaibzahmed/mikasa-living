import { getVendorById } from '@/actions/vendor/fetch.actions'
import VerificationPending from './VerificationPending'

const VendorVideos = async () => {
  const vendor = await getVendorById()

  if (vendor?.verificationStatus !== 'VERIFIED') {
    return <VerificationPending />
  }

  return <div>VendorVideos</div>
}
export default VendorVideos
