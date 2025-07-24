import Services from './_components/Services'
import HeroSection from './_components/HeroSection'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AboutUs from './_components/AboutUs'
import Footer from './_components/Footer'

const UserLandingPage = () => {
  return (
    <div>
      <HeroSection />

      <MaxWidthWrapper>
        <AboutUs />
        <Services />
      </MaxWidthWrapper>

      <Footer />
    </div>
  )
}
export default UserLandingPage
