import express from 'express'
import { auth } from '../../middleware/auth'
import { create, read, readAll, remove, update, validate } from '../../middleware/crud'
import { needPermission } from '../../middleware/permissions'
import Users from '../../models/users'
import { userPostSchema, userPutSchema } from './validation'

const usersRoutes = express.Router()
export default usersRoutes

usersRoutes.get('/', auth, needPermission('*.users.read'), readAll(Users))
usersRoutes.get('/:id', auth, needPermission('*.users.read'), read(Users))
usersRoutes.post('/', auth, needPermission('*.users'), validate(userPostSchema), create(Users))
usersRoutes.put('/:id', auth, needPermission('*.users'), validate(userPutSchema), update(Users))
usersRoutes.delete('/:id', auth, needPermission('*.users'), remove(Users))
