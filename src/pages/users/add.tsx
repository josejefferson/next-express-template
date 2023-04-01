import { Container, useToast } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import Name from '#components/forms/users/name'
import Nickname from '#components/forms/users/nickname'
import Password from '#components/forms/users/password'
import Permissions from '#components/forms/users/permissions'
import Photo from '#components/forms/users/photo'
import RequirePasswordChange from '#components/forms/users/require-password-change'
import Username from '#components/forms/users/username'
import ResourceAdd from '#contexts/resource-add'
import { defaultUser } from '#utils/defaults'

export default function Add() {
  const toast = useToast()

  return (
    <ResourceAdd
      id="users"
      name="Usuário"
      defaultData={defaultUser}
      layout={Layout}
      beforeSubmit={(values) => {
        const { confirmPassword, ...newValues } = values
        values = newValues
        if (values.password !== confirmPassword) {
          toast({ description: 'As senhas não se coincidem', status: 'error' })
          return
        }
        values.permissions = values.permissions?.split?.('\n') || values.permissions
        return values
      }}
    >
      <Name />
      <Nickname />
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
