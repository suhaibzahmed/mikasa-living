import { getUserById } from '@/actions/admin/fetch.actions'
import UserDetails from '../../_components/users/UserDetails'

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const userResponse = await getUserById(id)

  if (!userResponse.success || !userResponse.data) {
    return <div>User not found</div>
  }

  return <UserDetails user={userResponse.data} />
}

export default UserDetailsPage
