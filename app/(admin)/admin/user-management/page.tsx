import { getUsers } from '@/actions/user/fetch.actions'
import UserTable from '../_components/users/UserTable'

const UserManagementPage = async () => {
  const usersResponse = await getUsers({})

  const initialUsers = usersResponse.success ? usersResponse.data.users : []

  return (
    <div className="w-full space-y-4">
      <UserTable initialUsers={initialUsers} />
    </div>
  )
}

export default UserManagementPage
