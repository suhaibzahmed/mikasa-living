import { Suspense } from 'react'
import VendorList from '../../_components/VendorList'
import { getAllVendors } from '@/actions/common.actions'
import SortVendors from '../../_components/SortVendors'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const VendorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const sort = typeof params.sort === 'string' ? params.sort : 'all'
  const service = typeof params.service === 'string' ? params.service : 'all'
  const page = typeof params.page === 'string' ? Number(params.page) : 1

  const vendors = await getAllVendors({
    page,
    sort,
    service,
  })

  return (
    <MaxWidthWrapper className="my-32">
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-end">
          <SortVendors />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <VendorList
            vendors={vendors.data.vendors}
            totalPages={vendors.data.totalPages}
          />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  )
}
export default VendorsPage
