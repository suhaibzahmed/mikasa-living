import { getUserBookingHistory } from '@/actions/user/fetch.actions'
import NotFound from '@/components/common/NotFound'
import { History } from 'lucide-react'
import SingleBookingCard from './SingleBookingCard'

const BookingHistoryList = async () => {
  const bookings = await getUserBookingHistory()

  return (
    <div>
      {!bookings || bookings.length === 0 ? (
        <NotFound
          title="No bookings found"
          Icon={History}
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
export default BookingHistoryList
