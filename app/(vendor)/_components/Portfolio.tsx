import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VendorPhotos from './VendorPhotos'
import VendorVideos from './VendorVideos'
import { getVendorById } from '@/actions/vendor/fetch.actions'

const Portfolio = async () => {
  const vendor = await getVendorById()

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
          <VendorPhotos vendor={vendor} />
        </TabsContent>
        <TabsContent value="videos">
          <VendorVideos vendor={vendor} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Portfolio
