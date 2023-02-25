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
import { IconContext } from 'react-icons'
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
    <IconContext.Provider value={{ size: '24' }}>
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>
    </IconContext.Provider>
  )
}
