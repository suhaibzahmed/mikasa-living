import VerificationPending from './VerificationPending'
import { Vendor } from '@prisma/client'

const VendorVideos = async ({ vendor }: { vendor: Vendor | null }) => {
  if (vendor?.verificationStatus !== 'VERIFIED') {
    return <VerificationPending />
  }

  return <div>VendorVideos</div>
}
export default VendorVideos
