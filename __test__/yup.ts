// yarn ts-node --project tsconfig.server.json __test__/yup.ts

export {}
import { setLocale, object, string, array, boolean } from 'yup'
import { pt } from 'yup-locale-pt'
setLocale(pt)

const body = {
  _id: '000000000000',
  name: 'José',
  // photo: null,
  username: 'josejefferson',
  // password: '123456',
  permissions: []
  // requirePasswordChange: false
}

const schema = object({
  name: string().required().label('Nome'),
  username: string().required().label('Nome de usuário'),
  photo: string().default('').label('Foto'),
  password: string().label('Senha'),
  permissions: array(string()).required().label('Permissões'),
  requirePasswordChange: boolean().default(false).label('Solicitar alteração de senha')
})

try {
  // Payload inválido: Nome deve ser do tipo `string`, mas o valor final é: `[
  //   "\"José\""
  // ]`
  schema.validateSync(body)
  const user = schema.cast(body, { stripUnknown: true })
  console.log(user)
  // req.payload
} catch (err: any) {
  console.log('Payload inválido:', err.message)
}
