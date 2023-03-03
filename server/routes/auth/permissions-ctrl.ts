import { badRequest } from '@hapi/boom'
import { Request, Response } from 'express'
import Users from '../../models/users'

async function permissionsCtrl(req: Request, res: Response) {
  const user = await Users.findById(req.user?.id).select('permissions')
  if (!user) throw badRequest('Usuário inexistente')
  res.json(user.permissions)
}

export default permissionsCtrl
