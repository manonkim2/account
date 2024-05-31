import dynamic from 'next/dynamic'

import Skeleton from '@/components/shared/Skeleton'
import { BannerSkeleton } from '@components/home/EventBanners'
import Account from '@/components/home/Account'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <div>
      <EventBanners />
      <Account />
    </div>
  )
}
