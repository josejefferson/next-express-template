import { Box, ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react'
import { Fragment, ReactNode } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { withErrorBoundary } from 'react-error-boundary'
import { MdList, MdOutlineGridOn } from 'react-icons/md'
import useLocalStorageState from 'use-local-storage-state'
import { useResourceList } from '.'
import Failed from '#components/common/failed'
import { useAPI } from '../api'
import Resource from '../resource'
import Empty from './empty'

const Resources = withErrorBoundary(
  function ({ node, listNode }: { node: ReactNode; listNode: ReactNode }) {
    const apiContext = useAPI()
    const { data } = apiContext
    const { name, nameFem, id, url, removeURL, layout, useGridAndListLayout, listLayout } =
      useResourceList()
    const [showList, setShowList] = useLocalStorageState('showList-' + name, {
      defaultValue: false
    })
    const Layout: any = useGridAndListLayout ? (showList ? listLayout : layout) : layout ?? Fragment

    return (
      <>
        {!data.length && <Empty />}

        <Box textAlign="right" hidden={!useGridAndListLayout} pr={2} pt={2}>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="Exibição em grade" placement="bottom-end">
              <IconButton
                onClick={() => setShowList(false)}
                aria-label="Grade"
                icon={<MdOutlineGridOn />}
                variant={showList ? 'outline' : 'solid'}
              />
            </Tooltip>
            <Tooltip label="Exibição em lista" placement="bottom-end">
              <IconButton
                onClick={() => setShowList(true)}
                aria-label="Lista"
                icon={<MdList />}
                variant={!showList ? 'outline' : 'solid'}
              />
            </Tooltip>
          </ButtonGroup>
        </Box>

        <Layout>
          {data.map((element: any, i: number) => (
            <Resource
              name={name}
              nameFem={nameFem}
              id={id}
              url={url}
              removeURL={removeURL}
              element={element}
              apiContext={apiContext}
              key={i}
            >
              {useGridAndListLayout ? (showList ? listNode : node) : node}
            </Resource>
          ))}
        </Layout>
      </>
    )
  },
  { FallbackComponent }
)

export default Resources

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Failed
      title="Ocorreu um erro ao renderizar isto"
      err={error}
      footer="Contate o administrador se o problema persistir"
      retry={resetErrorBoundary}
    />
  )
}
