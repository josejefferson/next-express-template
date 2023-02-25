import mongoose, { ConnectOptions } from 'mongoose'
import log from '../helpers/log'

interface Options {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const options: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.set('strictQuery', true)
mongoose.connection.on('connecting', connecting)
mongoose.connection.on('connected', connected)
mongoose.connection.on('disconnected', disconnected)
mongoose.connection.on('error', error)

function mongoConnect() {
  if (!process.env.MONGO_DB) return
  mongoose.connect(process.env.MONGO_DB, { ...options } as ConnectOptions).catch(() => {})
}

function connecting() {
  log('INFO', undefined, 'MongoDB - Conectando...')
}

function connected() {
  log('SUCCESS', undefined, 'MongoDB - Conectado')
}

function disconnected() {
  log('ERROR', undefined, 'MongoDB - Desconectado')
}

function error(err: any) {
  log('ERROR', undefined, 'MongoDB - Falha ao conectar', err)
  setTimeout(mongoConnect, 5000)
}

if (process.env.MONGO_DB) mongoConnect()

export default mongoose
