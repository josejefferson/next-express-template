import { badRequest } from '@hapi/boom'
import { Request, Response } from 'express'
import Users from '../../models/users'

/** Retorna informações sobre o usuário logado */
export async function meCtrl(req: Request, res: Response) {
  if (!req.user?.id) throw badRequest('Você não está logado')
  const user = await Users.findById(req.user.id)
  if (!user) throw badRequest('Usuário inexistente')
  res.json(user)
}
