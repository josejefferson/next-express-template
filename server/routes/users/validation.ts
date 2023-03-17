import { setLocale, object, string, array, boolean } from 'yup'
import { pt } from 'yup-locale-pt'
setLocale(pt)

export const userPostSchema = object({
  name: string().trim().required().label('Nome'),
  username: string().trim().lowercase().required().label('Nome de usuário'),
  photo: string().nullable().default('').label('Foto'),
  password: string().required().label('Senha'),
  permissions: array(string()).required().label('Permissões'),
  requirePasswordChange: boolean().default(false).label('Solicitar alteração de senha')
})

export const userPutSchema = object({
  name: string().trim().required().label('Nome'),
  username: string().trim().lowercase().required().label('Nome de usuário'),
  photo: string().nullable().default('').label('Foto'),
  password: string().label('Senha'),
  permissions: array(string()).required().label('Permissões'),
  requirePasswordChange: boolean().default(false).label('Solicitar alteração de senha')
})
