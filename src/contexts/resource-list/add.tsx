import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import { useResourceList } from '.'
import { useResourceEditDrawer } from '../resource-edit-drawer'

export default function Add(props: ButtonProps & { deny?: boolean }) {
  const { id, name, namePlural } = useResourceList()
  const drawer = useResourceEditDrawer()

  return (
    <Link href={id + '/add'}>
      <Tooltip
        label={'Você não tem permissão para adicionar ' + namePlural.toLowerCase()}
        placement="top-end"
        textAlign="center"
        isDisabled={!props.deny}
      >
        <Button
          aria-label={'Adicionar ' + name.toLowerCase()}
          boxShadow="base"
          colorScheme="green"
          rounded="full"
          position="fixed"
          right="3"
          bottom="3"
          size="lg"
          leftIcon={<MdAdd />}
          disabled={props.deny}
          onClick={(e) => {
            if (drawer) {
              e.preventDefault()
              e.stopPropagation()
              drawer.setEditingID(null)
              drawer.onOpen()
            }
          }}
          {...props}
        >
          Adicionar
        </Button>
      </Tooltip>
    </Link>
  )
}
