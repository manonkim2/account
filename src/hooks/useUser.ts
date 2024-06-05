import { IUser } from '@/models/user'
import { useSession } from 'next-auth/react'

const useUser = () => {
  const { data } = useSession()

  return data == null ? null : (data.user as IUser)
}

export default useUser
