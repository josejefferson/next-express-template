import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { MdDelete } from 'react-icons/md'
import { useResourceEdit } from '.'
import api from '#utils/api'
import { useConfirmModal } from '../confirm-modal'

export default function Remove({ deny }: { deny?: 0 | 1 }) {
  const toast = useToast()
  const router = useRouter()
  const { values }: any = useFormikContext()
  const confirmDialog = useConfirmModal()
  const [loading, setLoading] = useState(false)
  const res = useResourceEdit()

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: 'Excluir ' + res.name.toLowerCase(),
      body: `Tem certeza que deseja excluir ${res.nameFem ? 'a' : 'o'} ${res.name.toLowerCase()}?`
    })
    if (!confirmed) return
    setLoading(true)
    return api
      .delete(`${res?.url}/${res?.elementID}`)
      .then(({ data }) => {
        toast({
          title: `${res?.name} excluíd${res?.nameFem ? 'a' : 'o'} com sucesso`,
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        if (res.onRemove) return res.onRemove(data)
        router.replace(`/${res?.id}`)
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

  useHotkeys('alt+x', handleDelete, {
    enableOnFormTags: true,
    preventDefault: true
  })

  return (
    <Tooltip label="Você não tem permissão para excluir" placement="bottom" isDisabled={!deny}>
      <Button
        title="Alt+X"
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
