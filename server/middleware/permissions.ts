import { badRequest, forbidden, unauthorized } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import env from '../config/env'
import { can } from '../helpers/permissions'
import Users from '../models/users'

/** Impede usuário sem permissão de acessar tal recurso */
export function needPermission(permissions: string | string[], message?: string) {
  if (typeof permissions === 'string') permissions = [permissions]

  return async (req: Request, res: Response, next: NextFunction) => {
    if (env.disableAuth) return next()
    if (!req.user || !req.user.id) throw unauthorized('Você precisa estar logado para prosseguir')
    const user = await Users.findById(req.user.id)
    if (!user) throw badRequest('Usuário inexistente')
    Object.assign(req.user, user.toObject())
    const hasPermission = can(user.permissions, permissions as string[])
    if (!hasPermission) throw forbidden(message || 'Você não tem permissão')
    next()
  }
}
