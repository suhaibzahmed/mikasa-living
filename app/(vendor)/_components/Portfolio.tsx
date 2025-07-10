import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VendorVideos from './UploadPhoto'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { getCompleteVendorDetails } from '@/actions/vendor/fetch.actions'

const Portfolio = async () => {
  const vendor = await getCompleteVendorDetails()

  return (
    <div>
      <Tabs
        orientation="vertical"
        defaultValue="photos"
        className="w-[400px]  "
      >
        <TabsList>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="photos">
          <Photos photos={vendor?.photos || []} />
          <UploadPhoto vendor={vendor} />
        </TabsContent>
        <TabsContent value="videos">
          <VendorVideos vendor={vendor} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Portfolio
