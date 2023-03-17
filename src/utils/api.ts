import axios from 'axios'
import getConfig from 'next/config'
import { getCookie } from './helpers'
const { publicRuntimeConfig } = getConfig()

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: publicRuntimeConfig.apiEndpoint || '/api/',
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
