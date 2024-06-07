import dynamic from 'next/dynamic'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'

import { BannerSkeleton } from '@components/home/EventBanners'
import Account from '@/components/home/Account'
import CreditScore from '@/components/home/CreditScore'
import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { IUser } from '@/models/user'
import { getAccount } from '@/remote/account'

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
    <>
      <EventBanners />
      <Account />
      <CreditScore />
      <CardList />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session && session?.user) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery(
      ['account', (session.user as IUser).id],
      () => getAccount((session.user as IUser).id),
    )
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
