import { Router } from 'express'
import { auth } from '../middleware/auth'
import authRoutes from './auth'
import usersRoutes from './users'

const routes = Router()
export default routes

routes.use('/api/auth', authRoutes)
routes.use('/api/users', auth, usersRoutes)
