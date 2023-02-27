import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import { useResourceList } from '.'

export default function Add(props: ButtonProps & { deny?: boolean }) {
  const { id, name, namePlural } = useResourceList()
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
          {...props}
        >
          Adicionar
        </Button>
      </Tooltip>
    </Link>
  )
}
