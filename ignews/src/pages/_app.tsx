import { AppProps } from 'next/app'
import Link from 'next/link'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'

import { Header } from '../components/Header'
import { linkResolver, repositoryName } from '../services/prismic'

import '../styles/global.scss'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <NextAuthProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </NextAuthProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
