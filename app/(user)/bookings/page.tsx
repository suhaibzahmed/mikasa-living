import { getUserBookings } from '@/actions/user/fetch.actions'
import NotFound from '@/components/common/NotFound'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'
import { BookOpenText } from 'lucide-react'

const UserBookingsPage = async () => {
  const bookings = await getUserBookings()

  return (
    <MaxWidthWrapper className="my-32">
      {!bookings || bookings.length === 0 ? (
        <NotFound
          title="No bookings found"
          Icon={BookOpenText}
          redirectLink="/view/vendors"
          redirectText="Go To Vendors"
        />
      ) : (
        <div className="grid grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.vendor.companyName}</CardTitle>
                <CardDescription>{booking.vendor.email}</CardDescription>
                <CardAction>{booking.status}</CardAction>
              </CardHeader>
              <CardContent>
                <p>Message: {booking.message}</p>
              </CardContent>
              <CardFooter className=" grid grid-cols-2 gap-4">
                <div>
                  <p>Booking Date:</p>
                  <p>{formatDate(booking.bookingDate)}</p>
                </div>
                <div>
                  <p>Booking Time:</p>
                  <p>{formatTime(booking.bookingTime)}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </MaxWidthWrapper>
  )
}
export default UserBookingsPage
