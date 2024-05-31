import dynamic from 'next/dynamic'

import { BannerSkeleton } from '@components/home/EventBanners'
import Account from '@/components/home/Account'
import CreditScore from '@/components/home/CreditScore'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <div>
      <EventBanners />
      <Account />
      <CreditScore />
      <CardList />
    </div>
  )
}
