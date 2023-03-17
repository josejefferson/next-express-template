import { object, setLocale, string } from 'yup'
import { pt } from 'yup-locale-pt'
setLocale(pt)

export const changePasswordSchema = object({
  oldPassword: string().required().label('Senha antiga'),
  password: string().required().label('Senha')
})
