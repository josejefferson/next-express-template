import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import { MdAdd } from 'react-icons/md'
import { useResourceList } from '.'
import { useResourceEditDrawer } from '../resource-edit-drawer'

export default function Add(props: ButtonProps & { deny?: 0 | 1 }) {
  const router = useRouter()
  const { id, name, namePlural, addButtonLinkProps } = useResourceList()
  const drawer = useResourceEditDrawer()
  useHotkeys('alt+a', (e) => {
    e.preventDefault()
    if (!drawer) return router.push('/' + id + '/add')
    drawer.setEditingID(null)
    drawer.onOpen()
  })

  return (
    <Link href={id + '/add'} {...addButtonLinkProps}>
      <Tooltip
        label={'Você não tem permissão para adicionar ' + namePlural.toLowerCase()}
        placement="top-end"
        textAlign="center"
        isDisabled={!props.deny}
      >
        <Button
          aria-label={'Adicionar ' + name.toLowerCase()}
          title="Alt+A"
          boxShadow="base"
          colorScheme="green"
          rounded="full"
          position="fixed"
          right="3"
          bottom="3"
          size="lg"
          leftIcon={<MdAdd />}
          disabled={!!props.deny}
          onClick={(e) => {
            if (!drawer) return
            e.preventDefault()
            e.stopPropagation()
            drawer.setEditingID(null)
            drawer.onOpen()
          }}
          {...props}
        >
          Adicionar
        </Button>
      </Tooltip>
    </Link>
  )
}
