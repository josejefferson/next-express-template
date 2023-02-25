import { badRequest, forbidden, unauthorized } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import env from '../../config/env'
import Users from '../../models/users'

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

export async function permissionsCtrl(req: Request, res: Response) {
  const user = await Users.findById(req.user?.id).select('permissions')
  if (!user) throw badRequest('Usuário inexistente')
  res.json(user.permissions)
}

/**
 * Retorna true se o usuário tem pelo menos uma das permissões requeridas
 */
export function can(userPermissions: string[], requestedPermissions: string[]) {
  userPermissions = userPermissions.filter((p) => p.startsWith('*'))

  for (const perm of requestedPermissions) {
    for (const permission of userPermissions) {
      if (permission === perm) return true
      if (startsWith(perm, permission)) return true
    }
  }
  return false
}

function startsWith(aStr: string, bStr: string) {
  const a = aStr.toLowerCase().split('.')
  const b = bStr.toLowerCase().split('.')
  for (let i = 0; i < b.length; i++) {
    if (a[i]?.trim() === '') continue
    if (b[i]?.trim() === '') continue
    if (a[i]?.trim() === '*') continue
    if (b[i]?.trim() === '*') continue
    if (a[i]?.trim() !== b[i].trim()) return false
  }
  return true
}
