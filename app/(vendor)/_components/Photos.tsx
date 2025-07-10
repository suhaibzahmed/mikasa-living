import { Photo } from '@prisma/client'
import Image from 'next/image'
import { DeletePhotoButton } from './DeletePhotoButton'

const Photos = ({ photos }: { photos: Photo[] }) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {photos.length} photo{photos.length === 1 ? '' : 's'} uploaded
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square border">
            <Image
              src={photo.url}
              alt="Vendor photo"
              fill
              className="object-cover rounded-md"
            />
            <DeletePhotoButton photoId={photo.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Photos
