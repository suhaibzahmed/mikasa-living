import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { Vendor, Plan, Photo, Video } from '@prisma/client'
import Videos from './Videos'
import UploadVideo from './UploadVideo'

type PortFolioProps = {
  vendor: (Vendor & { plan: Plan; photos: Photo[]; videos: Video[] }) | null
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
          <div>
            <Photos photos={vendor?.photos || []} />
            <UploadPhoto vendor={vendor} />
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div>
            <Videos videos={vendor?.videos || []} />
            <UploadVideo vendor={vendor} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Portfolio
