import { Fragment, ReactNode } from 'react'
import { FallbackProps, withErrorBoundary } from 'react-error-boundary'
import { useResourceList } from '.'
import Failed from '../../components/common/failed'
import { useAPI } from '../api'
import { useAuth } from '../auth'
import Resource from '../resource'
import Add from './add'
import Empty from './empty'

const Resources = withErrorBoundary(
  function ({ node }: { node: ReactNode }) {
    const apiContext = useAPI()
    const auth = useAuth()
    const { data } = apiContext
    const { name, nameFem, id, url, writePermissions, hideAddButton, layout } = useResourceList()
    const Layout = layout ?? Fragment

    return (
      <>
        {!data.length && <Empty />}

        <Layout>
          {data.map((element: any, i: number) => (
            <Resource
              name={name}
              nameFem={nameFem}
              id={id}
              url={url}
              element={element}
              apiContext={apiContext}
              key={i}
            >
              {node}
            </Resource>
          ))}
        </Layout>

        {!hideAddButton && (
          <Add deny={writePermissions && auth && !auth?.hasPermission(writePermissions)} />
        )}
      </>
    )
  },
  { FallbackComponent }
)

export default Resources

function FallbackComponent({ error }: FallbackProps) {
  return (
    <Failed
      title="Ocorreu um erro ao renderizar isto"
      err={error}
      footer="Contate o administrador se o problema persistir"
    />
  )
}
