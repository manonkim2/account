import dynamic from 'next/dynamic'
import { useSession, signIn, signOut } from 'next-auth/react'

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
  const { data } = useSession()
  console.log('🚀 ~ Home ~ data:', data)

  return (
    <div>
      <EventBanners />
      <Account />
      <CreditScore />
      <CardList />
    </div>
  )
}
