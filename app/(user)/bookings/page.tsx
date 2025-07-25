import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Suspense } from 'react'
import BookingsList from '../_components/BookingsList'

const UserBookingsPage = async () => {
  return (
    <MaxWidthWrapper className="my-32">
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList />
      </Suspense>
    </MaxWidthWrapper>
  )
}
export default UserBookingsPage
