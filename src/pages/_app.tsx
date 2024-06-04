import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
