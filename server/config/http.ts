import { notFound } from '@hapi/boom'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Router } from 'express'
import 'express-async-errors'
import env from './env'
import error from '../middleware/error'
import redirectHttps from '../middleware/redirect-https'
import next from 'next'
import routes from '../routes'
import log from '../helpers/log'

const dev = env.environment === 'development'
const nextApp = next({ dev })
const nextHandle = nextApp.getRequestHandler()

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

nextApp.prepare().then(setupExpressApp).catch(console.error)
function setupExpressApp() {
  app.listen(env.port, () => {
    log('INFO', undefined, 'Servidor HTTP iniciado na porta ' + env.port)
  })
}

export default routes
