import SingleBookingCard from './SingleBookingCard'
import { getUserBookings } from '@/actions/user/fetch.actions'
import NotFound from '@/components/common/NotFound'
import { BookOpenText } from 'lucide-react'

const BookingsList = async () => {
  const bookings = await getUserBookings()

  return (
    <div>
      {!bookings || bookings.length === 0 ? (
        <NotFound
          title="No bookings found"
          Icon={BookOpenText}
          redirectLink="/view/vendors"
          redirectText="Go To Vendors"
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <SingleBookingCard key={booking.id} bookingDetails={booking} />
          ))}
        </div>
      )}
    </div>
  )
}
export default BookingsList
