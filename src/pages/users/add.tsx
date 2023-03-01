import { Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import Name from '../../components/forms/users/name'
import Password from '../../components/forms/users/password'
import Permissions from '../../components/forms/users/permissions'
import Photo from '../../components/forms/users/photo'
import RequirePasswordChange from '../../components/forms/users/require-password-change'
import Username from '../../components/forms/users/username'
import ResourceAdd from '../../contexts/resource-add'
import { defaultUser } from '../../utils/defaults'

export default function Add() {
  return (
    <ResourceAdd
      url="/auth/users"
      id="users"
      name="Usuário"
      defaultData={defaultUser}
      layout={Layout}
    >
      <Name />
      <Username />
      <Photo />
      <Password />
      <RequirePasswordChange />
      <Permissions />
    </ResourceAdd>
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="8xl" p={0}>
      {children}
    </Container>
  )
}
