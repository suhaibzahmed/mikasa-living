import { getVendors } from '@/actions/vendor/fetch.actions'
import VendorTable from '../_components/vendors/VendorTable'

const VendorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const page = typeof params.page === 'string' ? Number(params.page) : 1
  const vendor = typeof params.vendor === 'string' ? params.vendor : undefined
  const isVerified =
    typeof params.isVerified === 'string' ? params.isVerified : undefined
  const plan = typeof params.plan === 'string' ? params.plan : undefined

  const vendorsResponse = await getVendors({
    page,
    vendor,
    isVerified,
    plan,
  })

  const { vendors, totalVendors } = vendorsResponse.data

  return (
    <div className="w-full space-y-4">
      <VendorTable
        initialVendors={vendors}
        currentPage={page}
        totalCount={totalVendors || 0}
      />
    </div>
  )
}

export default VendorManagementPage
