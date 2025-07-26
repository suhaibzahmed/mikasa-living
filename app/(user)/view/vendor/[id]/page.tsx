import { getVendorProfileDetails } from '@/actions/common.actions'
import AboutVendor from '@/app/(user)/_components/AboutVendor'
import ViewVendorPortfolio from '@/app/(user)/_components/ViewVendorPortfolio'
import VendorServices from '@/app/(user)/_components/VendorServices'
import VendorReviews from '@/app/(user)/_components/VendorReviews'
import { getAuthenticatedUser } from '@/actions/checkAuth'
import { prisma } from '@/lib/db'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import VendorProfileHeader from '@/app/(user)/_components/VendorProfileHeader'
import heroImg from '@/public/images/hero.jpeg'

const SingleVendorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const vendorDetails = await getVendorProfileDetails(id)

  if (!vendorDetails) {
    return <div>Vendor not found</div>
  }

  const portfolio = {
    images: vendorDetails.photos || [],
    videos: vendorDetails.videos || [],
    threeD: vendorDetails.threeDimensional || [],
  }
  const services = vendorDetails.services.map((s) => s.service) || []
  const reviews = vendorDetails.reviews || []

  const checkAuth = await getAuthenticatedUser()
  let hasReviewed = false
  if (checkAuth) {
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: checkAuth?.uid,
      },
    })
    hasReviewed = reviews.some((review) => review.userId === user?.id)
  }

  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
      : 0

  // const coverImage =
  //   vendorDetails.photos && vendorDetails.photos.length > 0
  //     ? vendorDetails.photos[0].url
  //     : '/images/placeholder.png'

  return (
    <div className="bg-background my-20">
      <div className="relative h-80 w-full">
        <Image
          src={heroImg}
          alt={`${vendorDetails.companyName} cover image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <MaxWidthWrapper className="relative z-10 -mt-20">
        <VendorProfileHeader
          vendor={vendorDetails}
          averageRating={averageRating}
          totalReviews={totalReviews}
        />

        <div className="mt-8">
          <Tabs defaultValue="about" className="w-full flex flex-col gap-y-5">
            <TabsList className="border-b w-full bg-transparent p-0">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <AboutVendor description={vendorDetails.description || ''} />
            </TabsContent>
            <TabsContent value="portfolio">
              <ViewVendorPortfolio portfolio={portfolio} />
            </TabsContent>
            <TabsContent value="services">
              <VendorServices services={services} />
            </TabsContent>
            <TabsContent value="reviews">
              <VendorReviews
                reviews={reviews}
                hasReviewed={hasReviewed}
                vendorId={id}
                userAuth={checkAuth}
              />
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
export default SingleVendorPage
