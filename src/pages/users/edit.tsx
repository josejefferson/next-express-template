import { useRouter } from 'next/router'
import Name from '../../components/forms/users/name'
import Password from '../../components/forms/users/password'
import Permissions from '../../components/forms/users/permissions'
import Photo from '../../components/forms/users/photo'
import RequirePasswordChange from '../../components/forms/users/require-password-change'
import Username from '../../components/forms/users/username'
import ResourceEdit from '../../contexts/resource-edit'

export default function Edit() {
  const router = useRouter()
  const { id } = router.query

  return (
    <ResourceEdit
      id="users"
      name="Usuário"
      url="/auth/users"
      elementID={id as string}
      writePermissions={['*.users']}
      apiProps={{
        axiosThen: ({ data }) => {
          data.permissions = data.permissions?.join?.('\n') || data.permissions
        }
      }}
      beforeSubmit={(values) => {
        const { confirmPassword, ...newValues } = values
        values = newValues
        if (values.password !== confirmPassword) return alert('As senhas não se coincidem')
        values.permissions = values.permissions?.split?.('\n') || values.permissions
        return values
      }}
    >
      <Name />
      <Username />
      <Photo />
      <Password />
      <RequirePasswordChange />
      <Permissions />
    </ResourceEdit>
  )
}
