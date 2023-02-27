import { Fragment, ReactNode } from 'react'
import { useResourceList } from '.'
import { useAPI } from '../api'
import { useAuth } from '../auth'
import Resource from '../resource'
import Add from './add'
import Empty from './empty'
import StatusBar from './status-bar'

export default function Resources({ node }: { node: ReactNode }) {
  const apiContext = useAPI()
  const auth = useAuth()
  const { data } = apiContext
  const { name, namePronoun, id, url, writePermissions, hideStatusbar, hideAddButton, layout } =
    useResourceList()
  const Layout = layout ?? Fragment

  return (
    <>
      {!data.length && <Empty />}

      <Layout>
        {data.map((element: any, i: number) => (
          <Resource
            name={name}
            pronoun={namePronoun}
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

      {!hideStatusbar && <StatusBar />}
      {!hideAddButton && (
        <Add deny={writePermissions && auth && !auth?.hasPermission(writePermissions)} />
      )}
    </>
  )
}
