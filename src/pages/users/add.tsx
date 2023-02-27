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
    <ResourceAdd url="/auth/users" id="users" name="Usuário" defaultData={defaultUser}>
      <Name />
      <Username />
      <Photo />
      <Password />
      <RequirePasswordChange />
      <Permissions />
    </ResourceAdd>
  )
}
