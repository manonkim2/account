import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'
import AuthGuard from '@/components/auth/AuthGuard'

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
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
