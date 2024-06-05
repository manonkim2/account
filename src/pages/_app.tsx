import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'

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
          <ReactQueryDevtools />
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <AuthGuard>
                <Navbar />
                <Component {...pageProps} />
              </AuthGuard>
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
