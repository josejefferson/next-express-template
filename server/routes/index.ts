import { Router } from 'express'
import authRoutes from './auth'
const routes = Router()

routes.use('/api/auth', authRoutes)

export default routes
