import { Photo } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VendorPhotos from './VendorPhotos'
import VendorVideos from './VendorVideos'

type PortfolioProps = {
  vendorPhotos: { photos: Photo[] } | null
}

const Portfolio = async () => {
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
          <VendorPhotos />
        </TabsContent>
        <TabsContent value="videos">
          <VendorVideos />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Portfolio
