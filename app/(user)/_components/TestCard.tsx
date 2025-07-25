import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'

const TestCard = () => {
  return (
    <div className="relative h-[450px] w-[350px] overflow-hidden rounded-3xl shadow-lg">
      <Image
        src="/images/bedroom.jpg" // Assuming the image is in public/images
        alt="Bedroom"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl" />
      <div className="absolute bottom-0 left-0 w-full text-white bg-black/30 p-4 backdrop-blur-lg rounded-xl">
        <div className="mb-4  ">
          <h3 className="mb-2 text-2xl font-bold">Luxury Suite</h3>
          <p className="mb-4 text-sm text-gray-300">
            A stunning suite with panoramic city views, perfect for a romantic
            getaway or a luxurious business trip.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span>4.9</span>
            </div>
            <div className="rounded-full bg-white/20 px-3 py-1 text-xs">
              2 Guests
            </div>
          </div>
        </div>
        <Button>Book Now</Button>
      </div>
    </div>
  )
}

export default TestCard
