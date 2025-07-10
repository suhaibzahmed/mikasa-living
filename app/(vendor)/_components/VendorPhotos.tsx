import VerificationPending from './VerificationPending'
import { Vendor } from '@prisma/client'

const VendorPhotos = async ({ vendor }: { vendor: Vendor | null }) => {
  if (vendor?.verificationStatus !== 'VERIFIED') {
    return <VerificationPending />
  }

  return <div>VendorPhotos</div>
}
export default VendorPhotos
