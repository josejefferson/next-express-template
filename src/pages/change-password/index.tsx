import { Container } from '@chakra-ui/react'
import ChangePassword from '../../components/change-password'
import Nav from '../../components/navbar'

export default function ChangePass() {
  return (
    <>
      <Nav title="Alterar senha" hideChangePasswordPopover />
      <Container maxW="3xl" my={3}>
        <ChangePassword />
      </Container>
    </>
  )
}
