import { Button, useToast } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import api from '../../../../utils/api'

export default function DeleteUser() {
  const toast = useToast()
  const router = useRouter()
  const { values }: any = useFormikContext()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja apagar o usuário "${values.name}"?`)) return
    setLoading(true)
    const toastOpts: any = await api
      .delete('/auth/users/' + values._id)
      .then(() => {
        router.replace('/users')
        return success()
      })
      .catch((err) => {
        setLoading(false)
        return error(err)
      })
    toast(toastOpts)
  }

  return (
    <Button
      leftIcon={<MdDelete />}
      rounded="full"
      colorScheme="red"
      mr={1}
      mb={1}
      hidden={!values._id}
      onClick={handleDelete}
      isLoading={loading}
    >
      Excluir
    </Button>
  )
}

function success() {
  return {
    title: 'Usuário excluído com sucesso',
    status: 'success',
    duration: 5000,
    isClosable: true
  }
}

function error(err: any) {
  return {
    title: 'Erro ao excluir usuário',
    description: err?.response?.data?.message || err.message,
    status: 'error',
    duration: 5000,
    isClosable: true
  }
}
