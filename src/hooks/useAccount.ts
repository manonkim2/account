import { getAccount } from '@/remote/account'
import { useQuery } from 'react-query'
import useUser from './useUser'

const useAccount = () => {
  const user = useUser()

  return useQuery(['account', user?.id], () => getAccount(user?.id as string), {
    enabled: user != null,
  })
}

export default useAccount
