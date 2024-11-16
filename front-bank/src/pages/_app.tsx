import '@styles/globals.css'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { AuthProvider } from '@contexts/auth'

import Hoc from '@components/layout/hoc'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SDK Cookbook</title>
        <meta content='initial-scale=1.0, width=device-width' name='viewport' />
      </Head>
      <Hoc>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Hoc>
    </>
  )
}
