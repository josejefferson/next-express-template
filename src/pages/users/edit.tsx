import { Container, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import Name from '#components/forms/users/name'
import Nickname from '#components/forms/users/nickname'
import Password from '#components/forms/users/password'
import Permissions from '#components/forms/users/permissions'
import Photo from '#components/forms/users/photo'
import RequirePasswordChange from '#components/forms/users/require-password-change'
import Username from '#components/forms/users/username'
import ResourceEdit from '#contexts/resource-edit'

export default function Edit() {
  const router = useRouter()
  const toast = useToast()
  const { id } = router.query

  return (
    <ResourceEdit
      id="users"
      name="Usuário"
      elementID={id as string}
      writePermissions={['*.users']}
      layout={Layout}
      apiProps={{
        axiosThen: ({ data }) => {
          data.permissions = data.permissions?.join?.('\n') || data.permissions
        }
      }}
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
    </ResourceEdit>
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="8xl" p={0}>
      {children}
    </Container>
  )
}
