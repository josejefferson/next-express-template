import { notFound } from '@hapi/boom'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import next from 'next'
import log from '../helpers/log'
import error from '../middleware/error'
import redirectHttps from '../middleware/redirect-https'
import routes from '../routes'
import env from './env'

const dev = env.environment === 'development'
const nextApp = next({ dev })
const nextHandle = nextApp.getRequestHandler()
nextApp.prepare().catch(console.error)

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')

app.use(redirectHttps) // Redireciona para HTTPS
app.use(cookieParser()) // Cookies
if (env.environment === 'development' || env.useCors) {
  app.options('*', cors({ credentials: true, origin: true })) // Cors
  app.use(cors({ credentials: true, origin: true })) // Cors
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use(express.static('public'))
app.use('/error', express.static('static/error'))
app.get('*', (req, res) => {
  return nextHandle(req, res)
})
app.all('*', () => {
  throw notFound('Ops! Esta página não foi encontrada!')
})
app.use(error)

app.listen(env.port, () => {
  log('INFO', undefined, 'Servidor HTTP iniciado na porta ' + env.port)
})

export default routes
