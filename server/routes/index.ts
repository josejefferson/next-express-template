import { Router } from 'express'
import authRoutes from './auth'
import usersRoutes from './users'

const routes = Router()
export default routes

routes.use('/api/auth', authRoutes)
routes.use('/api/users', usersRoutes)
