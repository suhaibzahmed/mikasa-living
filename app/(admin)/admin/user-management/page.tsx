import { getUsers } from '@/actions/admin/fetch.actions'
import UserTable from '../_components/users/UserTable'

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const page = typeof params.page === 'string' ? Number(params.page) : 1
  const user = typeof params.user === 'string' ? params.user : undefined

  const usersResponse = await getUsers({
    page,
    user,
  })

  const { users, totalUsers } = usersResponse.data

  return (
    <div className="w-full space-y-4">
      <UserTable
        initialUsers={users}
        currentPage={page}
        totalCount={totalUsers || 0}
      />
    </div>
  )
}

export default UserManagementPage
