import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useReportWebVitals } from 'next/web-vitals'

import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
