import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Container, Row } from 'react-grid-system'
import Nav from '../../components/navbar'
import EditUser from '../../components/users/edit/index'
import API, { useAPI } from '../../contexts/api'
import api from '../../utils/api'

export default function UpdateUser() {
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  // Envia os dados
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values)
    const { createdAt, createdBy, updatedAt, updatedBy, confirmPassword, ...data } = values
    if (data.password !== confirmPassword) return alert('As senhas não se coincidem')
    data.permissions = data.permissions?.split?.('\n') || data.permissions
    const toastOpts: any = await api
      .put('/auth/users/' + id, data)
      .then(success)
      .catch(errorOnSave)
      .finally(() => setSubmitting(false))
    toast(toastOpts)
  }

  return (
    <API
      url={'/auth/users/' + id}
      disable={!id}
      before={<Navbar />}
      axiosThen={({ data }) => {
        data.permissions = data.permissions?.join?.('\n') || data.permissions
      }}
    >
      <UpdateUserContainer handleSubmit={handleSubmit} />
    </API>
  )
}

function Navbar() {
  const { data } = useAPI()

  return <Nav title={`Editar usuário ${data?.name ? `"${data.name}"` : ''}`} showBackButton />
}

function UpdateUserContainer({ handleSubmit }: any) {
  const { data } = useAPI()

  return (
    <Container fluid style={{ height: '100%' }}>
      <Row>
        <EditUser data={data} handleSubmit={handleSubmit} />
      </Row>
    </Container>
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

function errorOnSave(err: any) {
  return {
    title: 'Erro ao salvar',
    description: err?.response?.data?.message || err.message,
    status: 'error',
    duration: 5000,
    isClosable: true
  }
}
