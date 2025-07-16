import FeaturedVendors from './_components/FeaturedVendors'
import Services from './_components/Services'

const UserLandingPage = () => {
  return (
    <div>
      <h4>Our Services</h4>
      <Services />

      <h4>Our Top-Rated Partners</h4>
      <FeaturedVendors />
    </div>
  )
}
export default UserLandingPage
