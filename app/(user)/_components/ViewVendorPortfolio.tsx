import { Photo, ThreeDimensional, Video } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

type ViewVendorPortfolioProps = {
  portfolio: {
    images: Photo[]
    videos: Video[]
    threeD: ThreeDimensional[]
  }
}

const ViewVendorPortfolio = ({ portfolio }: ViewVendorPortfolioProps) => {
  return (
    <Tabs
      defaultValue="photos"
      className=" w-full flex flex-row items-start gap-4 justify-center"
      orientation="vertical"
    >
      <TabsList className="shrink-0 grid grid-cols-1 h-auto min-w-28 gap-1 p-0 bg-background border-r">
        <TabsTrigger
          value="photos"
          className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
        >
          Photos
        </TabsTrigger>
        <TabsTrigger
          value="videos"
          className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
        >
          Videos
        </TabsTrigger>
        <TabsTrigger
          value="3d"
          className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5 "
        >
          360° Videos
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 min-h-40 flex items-center justify-center w-full border rounded-md font-medium text-muted-foreground">
        <TabsContent value="photos">
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
        <TabsContent value="videos">
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
      </div>
    </Tabs>
  )
}
export default ViewVendorPortfolio
