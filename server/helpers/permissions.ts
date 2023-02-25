import { badRequest, forbidden, unauthorized } from '@hapi/boom'
import { NextFunction, Response } from 'express'
import Users from '../models/users'

/** Impede usuário sem permissão de acessar tal recurso */
export function needPermission(permissions: string | string[], message?: string) {
  if (typeof permissions === 'string') permissions = [permissions]

  return async (req: any, res: Response, next: NextFunction) => {
    if (process.env.DISABLE_AUTH) return next()
    if (!req.user) throw unauthorized('Você precisa estar logado para prosseguir')
    const user = await Users.findOne({ username: req.user.name })
    if (!user) throw badRequest('Usuário inexistente')
    const hasPermission = can(user.permissions, permissions as string[])
    if (!hasPermission) throw forbidden(message || 'Você não tem permissão')
    next()
  }
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
