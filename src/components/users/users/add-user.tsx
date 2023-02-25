import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'

export default function AddUser() {
  return (
    <Link href="users/add">
      <Button
        aria-label="Adicionar usuário"
        boxShadow="base"
        colorScheme="green"
        rounded="full"
        position="fixed"
        right="3"
        bottom="3"
        size="lg"
        leftIcon={<MdAdd />}
      >
        Adicionar
      </Button>
    </Link>
  )
}
