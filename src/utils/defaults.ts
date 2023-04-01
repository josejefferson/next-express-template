import type { IUser } from '#types/user'

export const defaultPlaceholder = {}

export const defaultUser: IUser = {
  name: '',
  username: '',
  photo: '',
  permissions: '',
  requirePasswordChange: false
}
