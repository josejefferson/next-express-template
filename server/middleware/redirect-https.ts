import { NextFunction, Request, Response } from 'express'
import env from '../config/env'

const redirectHttps = (req: Request, res: Response, next: NextFunction) => {
  if (env.environment !== 'production' || !env.forceHttps) return next()
  const schema = (String(req.headers['x-forwarded-proto']) || '').toLowerCase()
  if (String(req.headers.host)?.indexOf('localhost') < 0 && schema !== 'https') {
    res.redirect('https://' + req.headers.host + req.url)
  } else {
    next()
  }
}

export default redirectHttps
