import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '@elements'
import { AuthContextProvider } from '@contexts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
