import { Box, CreateToastFnReturn, Heading, SimpleGrid, ToastId, useToast } from '@chakra-ui/react'
import { VscEmptyWindow } from 'react-icons/vsc'
import { useAPI } from '../../../contexts/api'
import { IUser } from '../../../types/user'
import api from '../../../utils/api'
import StatusBar from './status-bar'
import User from './user'

const sort = (a: IUser, b: IUser) => {
  if (a.name?.toLowerCase() < b.name?.toLowerCase()) return -1
  if (a.name?.toLowerCase() > b.name?.toLowerCase()) return 1
  return 0
}

export default function UserList() {
  const toast = useToast()
  const { data, setData: setUsers } = useAPI()
  const users = data as IUser[]

  const handleUserDelete = (e: any, user: IUser) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm(`Tem certeza que deseja apagar o usuário "${user.name}"?`)) return
    const toastId = loadingDelete(user, toast)

    api
      .delete<IUser>('/auth/users/' + user._id)
      .then(({ data }) => {
        successDelete(data, toast, toastId)
        setUsers([...users.filter((i) => i._id !== user._id)])
      })
      .catch((err) => errorDelete(err, toast, toastId))
  }

  const handleUserOpen = (e: any, user: IUser) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`/users/edit?id=${user._id}`, '_blank', 'top=0')
  }

  return (
    <>
      {!users.length && <Empty />}

      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2} m={3}>
        {users.sort(sort).map((user) => (
          <User
            user={user}
            handleUserDelete={handleUserDelete}
            handleUserOpen={handleUserOpen}
            key={user._id}
          />
        ))}
      </SimpleGrid>

      <StatusBar />
    </>
  )
}

function Empty() {
  return (
    <Box textAlign="center" opacity={0.5} justifyContent="center" mt={3}>
      <VscEmptyWindow size={180} style={{ margin: 'auto' }} />
      <Heading my={2}>Nenhum usuário</Heading>
      <Box>Crie um usuário clicando no botão &quot;Adicionar&quot; no canto inferior direito</Box>
    </Box>
  )
}

function loadingDelete(user: IUser, toast: CreateToastFnReturn) {
  return toast({
    title: `Excluindo usuário "${user.name}"...`,
    status: 'loading',
    duration: 100000
  })
}

function successDelete(data: IUser, toast: CreateToastFnReturn, toastId: ToastId) {
  return toast.update(toastId, {
    title: `Usuário "${data.name}" excluído com sucesso`,
    status: 'success' as 'success',
    duration: 5000,
    isClosable: true
  })
}

function errorDelete(err: any, toast: CreateToastFnReturn, toastId: ToastId) {
  return toast.update(toastId, {
    title: 'Erro ao excluir usuário',
    description: err?.response?.data?.message || err.message,
    status: 'error' as 'error',
    duration: 5000,
    isClosable: true
  })
}
