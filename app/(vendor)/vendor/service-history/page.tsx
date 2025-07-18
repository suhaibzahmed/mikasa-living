import { getServiceHistory } from '@/actions/vendor/fetch.actions'
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

const VendorServiceHistoryPage = async () => {
  const bookings = await getServiceHistory()

  if (!bookings || bookings.length === 0) {
    return <div>No bookings found</div>
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <CardTitle>{booking.user.name}</CardTitle>
            <CardDescription>{booking.user.email}</CardDescription>
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
  )
}
export default VendorServiceHistoryPage
