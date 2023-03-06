import { Head, Html, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
