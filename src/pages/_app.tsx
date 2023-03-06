import { ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { PropsWithChildren, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import { ErrorBoundary } from 'react-error-boundary'
import { IconContext } from 'react-icons'
import CriticalError from '../components/common/critical-error'
import AuthProvider from '../contexts/auth'
import '../styles/globals.css'
import { theme } from '../utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })

    Router.events.on('routeChangeComplete', () => {
      NProgress.done(false)
    })
  }, [])

  return (
    <ErrorBoundary FallbackComponent={CriticalError}>
      <IconContext.Provider value={{ size: '24' }}>
        <CookiesProvider>
          <ChakraProvider theme={theme}>
            <HeadersProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </HeadersProvider>
          </ChakraProvider>
        </CookiesProvider>
      </IconContext.Provider>
    </ErrorBoundary>
  )
}

function HeadersProvider({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <meta name="theme-color" content={useColorModeValue('#EDF2F7', '#171923')} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
      </Head>
      {children}
    </>
  )
}
