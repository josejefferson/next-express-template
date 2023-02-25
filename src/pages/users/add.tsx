import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Container, Row } from 'react-grid-system'
import Nav from '../../components/navbar'
import EditUser from '../../components/users/edit'
import api from '../../utils/api'
import { defaultUser } from '../../utils/data'

export default function AddUser() {
  const toast = useToast()
  const router = useRouter()

  // Envia os dados
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values)
    const { confirmPassword, ...data } = values
    if (data.password !== confirmPassword) return alert('As senhas não se coincidem')
    data.permissions = data.permissions?.split?.('\n') || data.permissions
    const toastOpts: any = await api
      .post('/auth/users', data)
      .then(({ data }) => {
        router.replace('/users/edit?id=' + data._id)
        return success()
      })
      .catch((err) => {
        setSubmitting(false)
        return error(err)
      })
    toast(toastOpts)
  }

  return (
    <>
      <Nav title="Adicionar usuário" showBackButton />
      <Container fluid style={{ height: '100%' }}>
        <Row>
          <EditUser data={defaultUser} handleSubmit={handleSubmit} />
        </Row>
      </Container>
    </>
  )
}

function success() {
  return {
    title: 'Salvo',
    status: 'success',
    duration: 5000,
    isClosable: true
  }
}

function error(err: any) {
  return {
    title: 'Erro ao salvar',
    description: err?.response?.data?.message || err.message,
    status: 'error',
    duration: 5000,
    isClosable: true
  }
}
