import { Photo, Video } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

type ViewVendorPortfolioProps = {
  portfolio: {
    images: Photo[]
    videos: Video[]
  }
}

const ViewVendorPortfolio = ({ portfolio }: ViewVendorPortfolioProps) => {
  return (
    <div>
      <h5>Portfolio</h5>
      <Tabs defaultValue="photos" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="photos">
          {portfolio.images.length < 1 ? (
            <p>No photos found</p>
          ) : (
            <div className="grid w-full grid-cols-3 gap-4">
              {portfolio.images.map((photo) => (
                <div key={photo.id} className="relative aspect-square border">
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
            <p>No videos found</p>
          ) : (
            <div className="grid w-full grid-cols-3 gap-4">
              {portfolio.videos.map((video) => (
                <div key={video.id} className="relative size-64">
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
      </Tabs>
    </div>
  )
}
export default ViewVendorPortfolio
