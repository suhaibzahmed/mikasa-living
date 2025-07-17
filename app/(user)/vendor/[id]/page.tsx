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

  return (
    <div className="flex-1">
      <div>
        <h5>{vendorDetails?.companyName}</h5>
        <Badge variant="outline">{vendorDetails?.plan.type}</Badge>

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
          <AboutVendor description={vendorDetails?.description || ''} />
        </TabsContent>
        <TabsContent value="portfolio">
          <ViewVendorPortfolio portfolio={portfolio} />
        </TabsContent>
        <TabsContent value="services">
          <VendorServices services={services} />
        </TabsContent>
        <TabsContent value="reviews">
          <VendorReviews reviews={reviews} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default SingleVendorPage
