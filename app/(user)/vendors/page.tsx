import { Suspense } from 'react'
import VendorFilters from '../_components/VendorFilters'
import VendorList from '../_components/VendorList'
import { getVendors } from '@/actions/user/fetch.actions'

const VendorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  //   const sort = params.sort || undefined
  //   const category = params.category || undefined
  //   const page = typeof params.page === 'string' ? Number(params.page) : undefined

  return (
    <div className="flex">
      <VendorFilters />
      <Suspense fallback={<div>Loading...</div>}>
        {/* <VendorList vendors={vendors} /> */}
      </Suspense>
    </div>
  )
}
export default VendorsPage
