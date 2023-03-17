import { object, setLocale, string } from 'yup'
import { pt } from 'yup-locale-pt'
setLocale(pt)

export const loginSchema = object({
  username: string().required().label('Nome de usuário'),
  password: string().required().label('Senha')
})
