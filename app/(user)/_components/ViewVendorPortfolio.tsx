import { Photo, ThreeDimensional, Video } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

type ViewVendorPortfolioProps = {
  portfolio: {
    images: Photo[]
    videos: Video[]
    threeD: ThreeDimensional[]
  }
}

const ViewVendorPortfolio = ({ portfolio }: ViewVendorPortfolioProps) => {
  return (
    <Card>
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="p-2">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="3d">360° Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="p-4">
          {portfolio.images.length < 1 ? (
            <p className="text-muted-foreground">No photos found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.images.map((photo) => (
                <div key={photo.id} className="relative aspect-square">
                  <Image
                    src={photo.url}
                    alt="photo"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="videos" className="p-4">
          {portfolio.videos.length < 1 ? (
            <p className="text-muted-foreground">No videos found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.videos.map((video) => (
                <div key={video.id} className="relative aspect-video">
                  <video
                    src={video.url}
                    controls
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="3d" className="p-4">
          {portfolio.threeD.length < 1 ? (
            <p className="text-muted-foreground">No 360° videos found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.threeD.map((media) => (
                <div key={media.id} className="relative aspect-video">
                  <video
                    src={media.url}
                    controls
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
export default ViewVendorPortfolio
