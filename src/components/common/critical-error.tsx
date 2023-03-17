import Head from 'next/head'
import type { FallbackProps } from 'react-error-boundary'

export default function CriticalError({ error }: FallbackProps) {
  return (
    <>
      <Head>
        <title>Ops! Ocorreu um erro e a página não pôde ser renderizada</title>
        <style>{'body { margin: 0; padding: 0; font-family: Roboto, Arial, sans-serif; }'}</style>
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 40px)',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/983/983874.png"
          alt="Página com problemas"
          style={{ width: '200px' }}
        />
        <h1>Ops! Ocorreu um erro e a página não pôde ser renderizada</h1>
        <p>Atualize a página e se o erro persistir contate o administrador</p>
        <p>
          <b>Detalhes do erro:</b> {error?.message ?? error}
          <details>
            <summary>Ver stack</summary>
            <pre style={{ textAlign: 'left' }}>{error?.stack}</pre>
          </details>
        </p>
      </div>
    </>
  )
}
