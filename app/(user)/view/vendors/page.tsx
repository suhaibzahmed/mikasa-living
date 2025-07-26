import { Suspense } from 'react'
import VendorList from '../../_components/VendorList'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const VendorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const sort = typeof params.sort === 'string' ? params.sort : 'all'
  const service =
    typeof params.service === 'string' ? params.service : undefined
  const page = typeof params.page === 'string' ? Number(params.page) : 1

  return (
    <MaxWidthWrapper className="my-32">
      <Suspense fallback={<div>Loading...</div>}>
        <VendorList sort={sort} service={service} page={page} />
      </Suspense>
    </MaxWidthWrapper>
  )
}
export default VendorsPage
