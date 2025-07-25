import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag, User } from 'lucide-react'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'

type BookingDetails = Prisma.BookingGetPayload<{
  include: {
    vendor: true
  }
}>

const SingleBookingCard = ({
  bookingDetails,
}: {
  bookingDetails: BookingDetails
}) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4 bg-muted/50 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {bookingDetails.vendor.profileImage ? (
            <Image
              src={bookingDetails.vendor.profileImage}
              alt={bookingDetails.vendor.companyName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-6 w-6" />
          )}
        </div>
        <div className="grid gap-1">
          <CardTitle className="text-xl font-semibold">
            {bookingDetails.vendor.companyName}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4" />
            <span>{bookingDetails.vendor.description}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Status
          </span>
          <Badge variant="outline" className="border-green-500 text-green-500">
            {bookingDetails.status}
          </Badge>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Date:</span>
            <span>{formatDate(bookingDetails.bookingDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Time:</span>
            <span>{formatTime(bookingDetails.bookingTime)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-6">
        <Button variant="outline">View Details</Button>
        <Button variant="destructive">Cancel Booking</Button>
      </CardFooter>
    </Card>
  )
}

export default SingleBookingCard
