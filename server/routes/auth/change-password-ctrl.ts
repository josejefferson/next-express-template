import { badRequest, unauthorized } from '@hapi/boom'
import { Request, Response } from 'express'
import Users from '../../models/users'

/** Retorna o token de acesso */
const changePasswordCtrl = async (req: Request, res: Response) => {
  const { oldPassword, password } = req.body
  if (!password) throw badRequest('A senha não pode estar vazia')

  const user = await Users.findById(req.user?.id).select('+password')
  if (!user) throw badRequest('Usuário inexistente')

  const passwordValidation = await user.validatePassword(oldPassword)
  if (!passwordValidation) {
    throw unauthorized('A senha antiga é inválida')
  }

  user.password = password
  user.requirePasswordChange = false
  await user.save()

  return res.sendStatus(200)
}

export default changePasswordCtrl
