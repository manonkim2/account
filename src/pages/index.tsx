import dynamic from 'next/dynamic'

import Skeleton from '@/components/shared/Skeleton'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
})

export default function Home() {
  return (
    <div>
      <EventBanners />
      <div>hi</div>
    </div>
  )
}
