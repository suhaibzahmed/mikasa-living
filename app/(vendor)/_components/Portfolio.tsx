import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VendorVideos from './VendorVideos'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { Vendor, Plan, Photo } from '@prisma/client'

type PortFolioProps = {
  vendor: (Vendor & { plan: Plan; photos: Photo[] }) | null
}

const Portfolio = ({ vendor }: PortFolioProps) => {
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
