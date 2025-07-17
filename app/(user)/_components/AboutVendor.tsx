import { getVendorAbout } from '@/actions/common.actions'

const AboutVendor = async ({ vendorId }: { vendorId: string }) => {
  const vendor = await getVendorAbout(vendorId)
  return (
    <div>
      <h5>About</h5>
      <p>{vendor?.description}</p>
    </div>
  )
}
export default AboutVendor
