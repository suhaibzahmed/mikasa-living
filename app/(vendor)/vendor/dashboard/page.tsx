import { getAuthenticatedUser } from '@/actions/checkAuth'

const VendorDashboard = async () => {
  const checkVendor = await getAuthenticatedUser()

  return (
    <div>
      VendorDashboard
      <p>{checkVendor.uid}</p>
      <p>Role:{checkVendor?.role}</p>
    </div>
  )
}
export default VendorDashboard
