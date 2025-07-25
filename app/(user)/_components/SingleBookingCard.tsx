import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Mail, MessageSquare, Phone } from 'lucide-react'
import { Booking, BookingStatus, Plan, Vendor } from '@prisma/client'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import { cn } from '@/lib/utils'
import bedroomImg from '@/public/images/bedroom.jpg'
import { formatTime } from '@/utils/formatTime'

type BookingDetails = Booking & { vendor: Vendor & { plan: Plan } }

const statusStyles: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]:
    'bg-yellow-500/20 text-yellow-100 border-yellow-500/40',
  [BookingStatus.CONFIRMED]: 'bg-green-500/20 text-green border-green-500/40',
  [BookingStatus.COMPLETED]: 'bg-green-500/20 text-green border-green-500/40',
  [BookingStatus.REJECTED]: 'bg-red-500/20 text-red border-red-500/40',
}

const SingleBookingCard = ({
  bookingDetails,
}: {
  bookingDetails: BookingDetails
}) => {
  const { vendor, status, bookingDate, bookingTime, message } = bookingDetails

  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <div className="relative h-52 w-full">
          <Image
            src={bedroomImg || '/images/placeholder.png'}
            alt={vendor.companyName}
            fill
            className="object-cover rounded"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="text-white">{vendor.companyName}</CardTitle>
            <Badge variant="secondary" className="mt-2">
              {vendor.plan.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6 space-y-4">
        <div className="flex items-center justify-center  ">
          <div
            className={cn(
              'capitalize border-2 w-full text-center py-2 tracking-[0.5rem] font-bold rounded',
              statusStyles[status]
            )}
          >
            {status.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t">
          {/* Left Column: Date & Time */}
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{formatDate(bookingDate)}</span>
            </div>
            <div className="flex items-center gap-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <span>{formatTime(bookingTime)}</span>
            </div>
          </div>

          {/* Right Column: Contact */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={`mailto:${vendor.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {vendor.email}
              </a>
            </div>
            <div className="flex items-center gap-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <a
                href={`tel:${vendor.phone}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {vendor.phone}
              </a>
            </div>
          </div>
        </div>

        {message && (
          <div className="pt-4 border-t">
            <div className="flex items-start gap-x-3">
              <MessageSquare className="h-5 w-5 mt-1 text-primary" />
              <p className="text-sm text-foreground italic">
                &ldquo;{message}&rdquo;
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SingleBookingCard
