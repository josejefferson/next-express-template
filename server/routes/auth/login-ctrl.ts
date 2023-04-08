import { unauthorized } from '@hapi/boom'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../../config/env'
import Users from '../../models/users'

/** Retorna o token de acesso */
const loginCtrl = async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user: any = await Users.findOne({ username }).select('+password')

  if (!user) {
    throw unauthorized('Usuário ou senha incorretos')
  }

  const passwordValidation = await user.validatePassword(password)
  if (!passwordValidation) {
    throw unauthorized('Usuário ou senha incorretos')
  }

  const id: string = user._id
  const token = jwt.sign({ id, username }, String(env.jwtSecret), {
    expiresIn: 30 * 24 * 60 * 60
  })

  return res.json({ token, name: user.name, photo: user.photo, nickname: user.nickname })
}

export default loginCtrl
