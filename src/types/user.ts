export interface IUser {
  _id?: string
  username: string
  name: string
  permissions: string[] | string
  photo?: string
  requirePasswordChange: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: { name: string }
  updatedBy?: { name: string }
}
