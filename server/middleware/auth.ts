import { unauthorized } from '@hapi/boom'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import log from '../helpers/log'

if (!env.jwtSecret) {
  log(
    'WARNING',
    undefined,
    'JWT Token: Variável de ambiente WEB_TOKEN_SECRET faltando. As autenticações não estarão protegidas! Por favor, defina esta variável com uma string aleatória'
  )
}

export const auth = (req: any, res: Response, next: NextFunction) => {
  if (env.disableAuth) return next()

  let [authType, token] = req.headers['authorization']?.split(' ') || [
    'Bearer',
    req.headers['x-access-token']
  ]

  if (authType !== 'Bearer' || !token) {
    if (req.cookies.authorization) {
      token = req.cookies.authorization
    } else {
      throw unauthorized('É necessário estar logado para prosseguir')
    }
  }

  try {
    const payload: any = jwt.verify(String(token), String(env.jwtSecret))
    req.user = payload
    next()
  } catch (err) {
    throw unauthorized('Sessão expirada')
  }
}

export const authLogin = (req: any, res: Response, next: NextFunction) => {
  try {
    auth(req, res, next)
  } catch (err) {
    res.redirect('/login?continue=' + encodeURIComponent(req.originalUrl))
  }
}

export const optionalAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    auth(req, res, next)
  } catch {
    next()
  }
}
