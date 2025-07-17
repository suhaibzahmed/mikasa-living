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
import Link from 'next/link'
import AboutVendor from '@/app/(user)/_components/AboutVendor'
import ViewVendorPortfolio from '@/app/(user)/_components/ViewVendorPortfolio'
import VendorServices from '@/app/(user)/_components/VendorServices'
import VendorReviews from '@/app/(user)/_components/VendorReviews'
import { prisma } from '@/lib/db'
import { Star } from 'lucide-react'

const SingleVendorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const vendorDetails = await getVendorProfileDetails(id)

  const reviews = vendorDetails?.reviews || []

  const userAuth = await checkUserAuth()
  const user = await prisma.user.findUnique({
    where: {
      firebaseUid: userAuth?.uid,
    },
  })
  const hasReviewed = reviews.some((review) => review.userId === user?.id)
  const totalReviews = reviews.length || 0
  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) / totalReviews

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
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Button asChild>
            <Link href="/user/sign-in">Request Callback</Link>
          </Button>
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
          <AboutVendor vendorId={id} />
        </TabsContent>
        <TabsContent value="portfolio">
          <ViewVendorPortfolio vendorId={id} />
        </TabsContent>
        <TabsContent value="services">
          <VendorServices vendorId={id} />
        </TabsContent>
        <TabsContent value="reviews">
          <VendorReviews
            reviews={reviews}
            hasReviewed={hasReviewed}
            vendorId={id}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default SingleVendorPage
