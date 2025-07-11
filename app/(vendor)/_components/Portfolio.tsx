import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { Vendor, Plan, Photo, Video } from '@prisma/client'
import VerificationPending from './VerificationPending'
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
          {vendor?.verificationStatus !== 'VERIFIED' ? (
            <VerificationPending />
          ) : (
            <>
              <Photos photos={vendor?.photos || []} />
              <UploadPhoto vendor={vendor} />
            </>
          )}
        </TabsContent>
        <TabsContent value="videos">
          {vendor?.verificationStatus !== 'VERIFIED' ? (
            <VerificationPending />
          ) : (
            <>
              <Videos videos={vendor?.videos || []} />
              <UploadVideo vendor={vendor} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Portfolio
