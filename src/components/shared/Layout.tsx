import Head from 'next/head'
import React from 'react'
import SEO from './SEO'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SEO title="My Account" description="내 자산 관리 앱" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
