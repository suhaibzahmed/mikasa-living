import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Suspense } from 'react'
import BookingsList from '../_components/BookingsList'
import TestCard from '../_components/TestCard'

const UserBookingsPage = async () => {
  return (
    <MaxWidthWrapper className="my-32">
      <TestCard />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList />
      </Suspense>
    </MaxWidthWrapper>
  )
}
export default UserBookingsPage
