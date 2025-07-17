import { checkUserAuth } from '@/actions/checkAuth'
import { getVendorProfileDetails } from '@/actions/common.actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AboutVendor from '@/app/(user)/_components/AboutVendor'
import ViewVendorPortfolio from '@/app/(user)/_components/ViewVendorPortfolio'
import VendorServices from '@/app/(user)/_components/VendorServices'
import VendorReviews from '@/app/(user)/_components/VendorReviews'
import { prisma } from '@/lib/db'
import { Star } from 'lucide-react'
import VendorBookingForm from '../../_components/VendorBookingForm'
import RedirectToLoginButton from '@/components/common/RedirectToLoginButton'

const SingleVendorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const vendorDetails = await getVendorProfileDetails(id)

  const portfolio = {
    images: vendorDetails?.photos || [],
    videos: vendorDetails?.videos || [],
  }
  const services = vendorDetails?.services || []
  const reviews = vendorDetails?.reviews || []

  const userAuth = await checkUserAuth()
  let hasReviewed = false
  if (userAuth) {
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: userAuth?.uid,
      },
    })

    hasReviewed = reviews.some((review) => review.userId === user?.id)
  }

  const totalReviews = reviews.length || 0
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : 0

  return (
    <div className="flex-1">
      <div>
        <h5>{vendorDetails?.companyName}</h5>
        <Badge variant="outline">{vendorDetails?.plan.type}</Badge>
        <div className="flex gap-x-2">
          <Star fill="yellow" />
          <p>{averageRating}/5</p>
          <p>
            ({totalReviews} review{totalReviews > 1 ? 's' : ''})
          </p>
        </div>

        {userAuth ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Request Callback</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Request a Callback from {vendorDetails?.companyName}
                </DialogTitle>
                <DialogDescription>
                  <VendorBookingForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <RedirectToLoginButton
            toastMessage="You must be logged in to book a callback"
            btnText="Request Callback"
          />
        )}
      </div>
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <AboutVendor description={vendorDetails?.description || ''} />
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
            userAuth={userAuth}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default SingleVendorPage
