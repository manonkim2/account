import { getCredit } from '@remote/credit'
import useUser from '@/hooks/useUser'
import { useQuery } from 'react-query'

function useCredit() {
  const user = useUser()

  return useQuery(['credit', user?.id], () => getCredit(user?.id as string), {
    enabled: user != null,
  })
}

export default useCredit
