import { getVendors } from '@/actions/admin/fetch.actions'
import VendorTable from '../_components/vendors/VendorTable'

const VendorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const page = typeof params.page === 'string' ? Number(params.page) : 1
  const vendor = typeof params.vendor === 'string' ? params.vendor : undefined
  const verificationStatus =
    typeof params.verificationStatus === 'string'
      ? params.verificationStatus
      : undefined
  const plan = typeof params.plan === 'string' ? params.plan : undefined

  const vendorsResponse = await getVendors({
    page,
    vendor,
    verificationStatus,
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
