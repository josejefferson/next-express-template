import { IUser } from '../types/user'

export const defaultUser: IUser = {
  name: '',
  username: '',
  photo: '',
  permissions: '',
  requirePasswordChange: false
}

export const permissions = [
  { ids: ['*'], description: 'ACESSO COMPLETO AOS SISTEMAS' },
  { ids: ['*.users.read'], description: 'Ver todos os usuários' },
  { ids: ['*.users'], description: 'Acesso total aos usuários' }
]
