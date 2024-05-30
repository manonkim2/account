import { getEventBanners } from '@/remote/banner'
import { useQuery } from 'react-query'

const useEventBanner = () => {
  return useQuery(
    ['event-banners'],
    () => getEventBanners({ hasAccount: false }),
    { suspense: true },
  )
}

export default useEventBanner
