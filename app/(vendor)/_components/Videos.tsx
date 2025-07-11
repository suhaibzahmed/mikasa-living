'use client'
import { Video } from '@prisma/client'
import { DeleteVideoButton } from './DeleteVideoButton'

const Videos = ({ videos }: { videos: Video[] }) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {videos.length} video{videos.length === 1 ? '' : 's'} uploaded
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="relative size-64 ">
            <video
              src={video.url}
              controls
              className="w-full h-full object-cover rounded-md"
            />
            <DeleteVideoButton videoId={video.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Videos
