import FeaturedVendors from './_components/FeaturedVendors'
import Services from './_components/Services'
import HeroSection from './_components/HeroSection'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AboutUs from './_components/AboutUs'

const UserLandingPage = () => {
  return (
    <div>
      <HeroSection />

      <MaxWidthWrapper>
        <AboutUs />
        <h4>Our Services</h4>
        <Services />

        <h4>Our Top-Rated Partners</h4>
        <FeaturedVendors />
      </MaxWidthWrapper>
    </div>
  )
}
export default UserLandingPage
