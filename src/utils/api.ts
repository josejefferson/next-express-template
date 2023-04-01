import axios from 'axios'
import { getCookie } from './helpers'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api/',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  config.headers ||= {}
  const auth = getCookie('authorization')
  if (auth && process.env.NEXT_PUBLIC_USE_API_CUSTOM_HEADER) config.headers['x-access-token'] = auth
  else if (auth) config.headers.Authorization = 'Bearer ' + auth
  return config
})

export default api
