import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
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
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </ChakraProvider>
        </CookiesProvider>
      </IconContext.Provider>
    </ErrorBoundary>
  )
}
