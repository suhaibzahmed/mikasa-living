import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Image from 'next/image'

export const TestCard = () => {
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

// const VendorCard1 = () => {
//   return (
//     <div className="rounded-lg overflow-hidden shadow-lg bg-card text-card-foreground border relative">
//     <div className="relative h-48 w-full top-0">
//     <Image
//       src={bedroomImg || ''}
//       alt={vendorDetails.companyName}
//       fill
//       className="object-cover "
//     />
//   </div>
//   <div className="p-6 flex flex-col gap-y-6">
//     <div className="flex items-center justify-between">
//       <h5 className="truncate">{vendorDetails.companyName}</h5>
//       <Badge variant="outline">{vendorDetails.plan.type}</Badge>
//     </div>
//     <p className="text-muted-foreground ">
//       {vendorDetails.description && vendorDetails.description?.length > 100
//         ? vendorDetails.description?.substring(0, 100) + '...'
//         : vendorDetails.description || 'No description available.'}
//     </p>
//     <div className="flex items-center justify-between">
//       <div className="flex items-center">
//         <Star className="w-4 h-4 text-primary mr-1" fill="#f3c018" />
//         <span className=" font-medium">{averageRating.toFixed(1)}</span>
//         <span className=" text-muted-foreground ml-1">
//           ({totalReviews} reviews)
//         </span>
//       </div>
//       <span className=" text-muted-foreground ml-1">
//         {startTime} - {endTime}
//       </span>
//     </div>

//     <div className="flex flex-col gap-y-4 w-full items-center ">
//       <Button asChild variant="secondary" className="w-full">
//         <Link href={`/vendor/${vendorDetails.id}`}>View Profile</Link>
//       </Button>

//       <BookConsultationButton vendorDetails={vendorDetails} />
//     </div>
//   </div>
// </div>
//   )}
