import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useResourceEdit } from '.'
import api from '../../utils/api'

export default function Remove({ deny }: { deny?: boolean }) {
  const toast = useToast()
  const router = useRouter()
  const { values }: any = useFormikContext()
  const [loading, setLoading] = useState(false)
  const res = useResourceEdit()

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir?')) return
    setLoading(true)
    return api
      .delete(`${res?.url}/${res?.elementID}`)
      .then(() => {
        router.replace('/users')
        toast({
          title: res?.name + ' excluído com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
      })
      .catch((err) => {
        setLoading(false)
        toast({
          title: 'Erro ao excluir ' + res?.name.toLowerCase(),
          description: err?.response?.data?.message || err.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      })
  }

  return (
    <Tooltip label="Você não tem permissão para excluir" placement="bottom" isDisabled={!deny}>
      <Button
        leftIcon={<MdDelete />}
        rounded="full"
        colorScheme="red"
        mr={1}
        mb={1}
        hidden={!values._id}
        onClick={handleDelete}
        isLoading={loading}
        disabled={loading ?? deny}
      >
        Excluir
      </Button>
    </Tooltip>
  )
}
