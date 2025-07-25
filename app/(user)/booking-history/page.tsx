import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Suspense } from 'react'
import BookingHistoryList from '../_components/BookingHistoryList'

const UserBookingHistoryPage = async () => {
  return (
    <MaxWidthWrapper className="my-32">
      <Suspense fallback={<div>Loading...</div>}>
        <BookingHistoryList />
      </Suspense>
    </MaxWidthWrapper>
  )
}
export default UserBookingHistoryPage
